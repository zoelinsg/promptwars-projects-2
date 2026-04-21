import React, { useState } from 'react';

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

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const completedCount = items.filter(i => i.completed).length;
  const progressPercentage = Math.round((completedCount / items.length) * 100);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2>My Voting Checklist</h2>
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
