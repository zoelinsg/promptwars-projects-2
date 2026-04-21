import React, { useState } from 'react';
import { UserPlus, UserCheck, HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react';

type FlowState = 'selection' | 'first-time' | 'registered' | 'help';

const OptionCard = ({ title, description, icon, onClick }: { title: string, description: string, icon: React.ReactNode, onClick: () => void }) => (
  <div 
    className="card" 
    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}
    onClick={onClick}
  >
    <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{icon}</div>
    <h3>{title}</h3>
    <p className="mt-1" style={{ flex: 1 }}>{description}</p>
    <div className="mt-2 text-primary flex items-center gap-1 font-medium text-sm" style={{ color: 'var(--primary)' }}>
      Get Started <ArrowRight size={16} />
    </div>
  </div>
);

const StepGuide = ({ title, steps, onBack }: { title: string, steps: string[], onBack: () => void }) => (
  <div className="card">
    <div className="flex items-center gap-2 mb-4">
      <button className="btn-icon" onClick={onBack} aria-label="Go back">
        <ArrowLeft size={20} />
      </button>
      <h2 style={{ margin: 0 }}>{title} Guide</h2>
    </div>
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className="step">
          <div className="step-number">{index + 1}</div>
          <div className="step-content">
            <p style={{ marginTop: '0.4rem', color: 'var(--text-main)', fontWeight: 500 }}>{step}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const PersonalizedFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowState>('selection');

  return (
    <div>
      {currentFlow === 'selection' && (
        <>
          <div className="text-center mb-4">
            <h2>Let's build your voting plan</h2>
            <p>Select the option that best describes you to get a personalized guide.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <OptionCard 
              title="First-Time Voter" 
              description="I've never voted before and need help registering and understanding the process."
              icon={<UserPlus size={40} />}
              onClick={() => setCurrentFlow('first-time')}
            />
            <OptionCard 
              title="Registered Voter" 
              description="I'm already registered but want to prepare for the upcoming election."
              icon={<UserCheck size={40} />}
              onClick={() => setCurrentFlow('registered')}
            />
            <OptionCard 
              title="I Need Help" 
              description="I'm not sure of my status or next steps. Help me figure it out."
              icon={<HelpCircle size={40} />}
              onClick={() => setCurrentFlow('help')}
            />
          </div>
        </>
      )}

      {currentFlow === 'first-time' && (
        <StepGuide 
          title="First-Time Voter"
          steps={[
            "Check if you meet the eligibility requirements (U.S. citizen, 18+ by Election Day).",
            "Gather necessary documents (usually a state ID or Social Security Number).",
            "Register to vote online, by mail, or in-person before your state's deadline.",
            "Verify your registration status a few weeks later.",
            "Find your assigned polling place and research what's on your ballot."
          ]}
          onBack={() => setCurrentFlow('selection')}
        />
      )}

      {currentFlow === 'registered' && (
        <StepGuide 
          title="Registered Voter"
          steps={[
            "Double-check your registration status to ensure your address is current.",
            "Decide how you want to vote: in-person, early, or by mail.",
            "If voting by mail, request your ballot before the deadline.",
            "Review a sample ballot to research candidates and local measures.",
            "Mark your calendar for Election Day and locate your polling place."
          ]}
          onBack={() => setCurrentFlow('selection')}
        />
      )}

      {currentFlow === 'help' && (
        <StepGuide 
          title="Voter Identification"
          steps={[
            "Go to your state's official election website or Vote.org.",
            "Use the 'Check Registration Status' tool with your name and birthdate.",
            "If you are not found in the system, proceed to the First-Time Voter steps to register.",
            "If you are registered but the info is wrong, submit a registration update form.",
            "If everything looks good, you are ready to plan how you will vote!"
          ]}
          onBack={() => setCurrentFlow('selection')}
        />
      )}
    </div>
  );
};
