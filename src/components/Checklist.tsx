import React, { useState } from 'react';
import { useFirebaseSession } from '../hooks/useFirebaseSession';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const defaultItems: ChecklistItem[] = [
  { id: '1', text: 'Verify voter registration status', completed: false },
  { id: '2', text: 'Locate my polling place', completed: false },
  { id: '3', text: 'Research candidates and measures on the ballot', completed: false },
  { id: '4', text: 'Prepare required ID for voting', completed: false },
  { id: '5', text: 'Plan a time to vote on Election Day', completed: false },
];

export const Checklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const { updateData: setSummary, saveData, savedHint } = useFirebaseSession<{completed: number, total: number} | null>('planSummary', null, { autoSave: false });

  const toggleItem = (id: string) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercentage = Math.round((completedCount / items.length) * 100);

  const handleSavePlan = async () => {
    await setSummary({ completed: completedCount, total: items.length });
    await saveData();
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h2>My Voting Checklist</h2>
          <button 
            className="btn btn-primary" 
            style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }} 
            onClick={handleSavePlan}
          >
            Save Plan
          </button>
          {savedHint && <span style={{ fontSize: '0.85rem', color: 'var(--primary)', opacity: 0.8 }}>Saved!</span>}
        </div>
        <span className="badge badge-blue">
          {completedCount} of {items.length} done
        </span>
      </div>

      <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '4px', marginBottom: '1.5rem', overflow: 'hidden' }}>
        <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
      </div>

      <div className="checklist">
        {items.map(item => (
          <div key={item.id} className="checklist-item">
            <label className="checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={item.completed}
                onChange={() => toggleItem(item.id)}
              />
              <span className="checkmark"></span>
            </label>
            <span style={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--text-muted)' : 'var(--text-main)', paddingTop: '2px' }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
