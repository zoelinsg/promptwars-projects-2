import { Timeline } from './components/Timeline';
import { PersonalizedFlow } from './components/PersonalizedFlow';
import { Checklist } from './components/Checklist';
import { FAQ } from './components/FAQ';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Vote } from 'lucide-react';
import './index.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <a href="/" className="logo">
            <Vote size={28} />
            VoteReady
          </a>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Get Started
          </button>
        </div>
      </nav>

      <main className="container main-content">
        <section className="text-center" style={{ padding: '2rem 0 1rem' }}>
          <h1 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '3rem' }}>Your Guide to the Election Process</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Empowering you with clear, step-by-step guidance to ensure your voice is heard in the upcoming elections.
          </p>
        </section>

        <section>
          <PersonalizedFlow />
        </section>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <section>
            <Timeline />
          </section>
          <section>
            <Checklist />
          </section>
        </div>

        <section className="mt-2 text-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ maxWidth: '800px', width: '100%' }}>
            <FAQ />
          </div>
        </section>
      </main>

      <footer className="mt-4" style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-muted)' }}>
        <p>© 2024 VoteReady. For educational purposes.</p>
      </footer>

      <GeminiAssistant />
    </>
  );
}

export default App;
