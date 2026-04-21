import React from 'react';

const mockDates = [
  { id: 1, date: 'Oct 7, 2024', event: 'Voter Registration Deadline', description: 'Last day to register to vote for the general election.' },
  { id: 2, date: 'Oct 22, 2024', event: 'Early Voting Begins', description: 'In-person early voting opens at select locations.' },
  { id: 3, date: 'Oct 29, 2024', event: 'Mail-in Ballot Request Deadline', description: 'Last day to request a mail-in absentee ballot.' },
  { id: 4, date: 'Nov 5, 2024', event: 'Election Day', description: 'Polls are open from 7 AM to 8 PM. Mail-in ballots must be postmarked by today.' },
];

export const Timeline: React.FC = () => {
  return (
    <div className="card">
      <h2 className="mb-4">Key Election Dates</h2>
      <div className="stepper">
        {mockDates.map((item, index) => {
          // Check if date is past based on a fixed current date for the MVP demo (e.g. Oct 15)
          const isPast = index === 0; 
          const isNext = index === 1;

          return (
            <div key={item.id} className={`step ${isPast ? 'completed' : ''} ${isNext ? 'active' : ''}`}>
              <div className="step-number">
                {isPast ? '✓' : index + 1}
              </div>
              <div className="step-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>{item.event}</h3>
                  <span className={`badge ${isPast ? 'badge-green' : isNext ? 'badge-blue' : ''}`} style={{ backgroundColor: !isPast && !isNext ? 'var(--bg-main)' : undefined }}>
                    {item.date}
                  </span>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
