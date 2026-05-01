import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAI, GoogleAIBackend } from 'firebase/ai';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Graceful fallback if Firebase is not configured
export const isFirebaseConfigured = !!firebaseConfig.projectId;

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;
export const vertexAI = app ? getAI(app, { backend: new GoogleAIBackend() }) : null;

let analyticsInstance: ReturnType<typeof getAnalytics> | null = null;

if (app) {
  if (import.meta.env.DEV) {
    (window as unknown as { FIREBASE_APPCHECK_DEBUG_TOKEN: boolean }).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'dummy-key'),
      isTokenAutoRefreshEnabled: true
    });
  } catch (e) {
    console.warn('App Check initialization failed', e);
  }

  isSupported().then((supported) => {
    if (supported) {
      try {
        analyticsInstance = getAnalytics(app!);
      } catch (e) {
        console.warn('Analytics initialization failed', e);
      }
    }
  });
}

export const logAppEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (analyticsInstance) {
    try {
      logEvent(analyticsInstance, eventName, params);
    } catch (e) {
      console.warn('Analytics logging failed', e);
    }
  }
};

// Simple session management
const SESSION_KEY = 'vote_ready_session_id';
export const getSessionId = () => {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
};
