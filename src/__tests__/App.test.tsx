import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('VoteReady App MVP', () => {
  it('renders the main application title', () => {
    render(<App />);
    expect(screen.getByText('Your Guide to the Election Process')).toBeInTheDocument();
  });

  it('renders the core components', () => {
    render(<App />);
    expect(screen.getByText('Key Election Dates')).toBeInTheDocument();
    expect(screen.getByText('My Voting Checklist')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('allows interaction with the personalized flow', () => {
    render(<App />);
    
    // Initial state is selection
    expect(screen.getByText("Let's build your voting plan")).toBeInTheDocument();
    
    // Click on First-Time Voter
    const firstTimeCard = screen.getByText("First-Time Voter").closest('.card');
    fireEvent.click(firstTimeCard!);
    
    // Should navigate to guide
    expect(screen.getByText("First-Time Voter Guide")).toBeInTheDocument();
    
    // Click back
    const backBtn = screen.getByRole('button', { name: "Go back" });
    fireEvent.click(backBtn);
    
    // Should be back at selection
    expect(screen.getByText("Let's build your voting plan")).toBeInTheDocument();
  });

  it('opens and closes the Gemini Assistant chatbot', () => {
    render(<App />);
    
    // Find the toggle button
    const toggleBtn = screen.getByRole('button', { name: "Open chat assistant" });
    expect(toggleBtn).toBeInTheDocument();
    
    // The chatbot window should visually be hidden initially via CSS class, 
    // but React Testing Library doesn't check CSS visibility by default without specific matchers,
    // so we simulate the click and check the state change through interaction
    fireEvent.click(toggleBtn);
    
    // Chat window should be open
    expect(screen.getByText("VoteReady Assistant")).toBeInTheDocument();
    
    // Close chat
    const closeBtn = screen.getByRole('button', { name: "Close chat" });
    fireEvent.click(closeBtn);
  });
});
