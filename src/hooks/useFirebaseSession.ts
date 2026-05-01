import { useState, useEffect, useRef } from 'react';
import { db, getSessionId, isFirebaseConfigured } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export function useFirebaseSession<T>(key: string, initialValue: T, options = { autoSave: true }) {
  const [data, setData] = useState<T>(initialValue);
  const dataRef = useRef<T>(initialValue);
  const [savedHint, setSavedHint] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!isFirebaseConfigured || !db) {
        setInitialized(true);
        return;
      }
      
      const sessionId = getSessionId();
      const docRef = doc(db, 'user_sessions', sessionId);
      
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          if (docData[key] !== undefined) {
            setData(docData[key] as T);
            dataRef.current = docData[key] as T;
          }
        }
      } catch (error) {
        console.error('Error loading data from Firestore:', error);
      } finally {
        setInitialized(true);
      }
    }
    
    loadData();
  }, [key]);

  const saveData = async () => {
    if (!isFirebaseConfigured || !db || !initialized) return;

    try {
      const sessionId = getSessionId();
      const docRef = doc(db, 'user_sessions', sessionId);
      
      try {
        await updateDoc(docRef, { [key]: dataRef.current });
      } catch (error) {
        const e = error as { code?: string };
        if (e.code === 'not-found') {
          await setDoc(docRef, { [key]: dataRef.current });
        } else {
          throw error;
        }
      }
      
      setSavedHint(true);
      setTimeout(() => setSavedHint(false), 2000);
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  const updateData = async (newData: T | ((prev: T) => T)) => {
    const valueToSave = newData instanceof Function ? newData(dataRef.current) : newData;
    setData(valueToSave);
    dataRef.current = valueToSave;
    
    if (options.autoSave) {
      await saveData();
    }
  };

  return { data, updateData, saveData, savedHint, initialized };
}
