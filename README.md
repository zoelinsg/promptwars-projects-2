# VoteReady - Election Process Education MVP

VoteReady is an interactive, lightweight web assistant designed to help voters navigate the election process. Built for the Google Cloud "Election Process Education" challenge, this MVP focuses on delivering clear, accessible, and personalized guidance for different voter types.

## Vertical
**Election Process Education & Preparation**

## Approach and Logic
The goal of VoteReady is to make voting less overwhelming by transforming formal requirements into a simple, step-by-step journey. The application avoids heavy frameworks or visual clutter. Instead, it relies on modern CSS aesthetics (glassmorphism accents, soft gradients) and clear typography to feel educational and encouraging.

The logic is built around guiding users based on their context:
1. **Personalization**: A quick selection flow identifies if the user is a first-time voter, registered voter, or needs help finding their status.
2. **Visualization**: A timeline clearly articulates when critical events happen (registration, early voting, absentee requests).
3. **Actionability**: A checklist tracks concrete things the user needs to do before election day.
4. **Assistance**: A built-in chatbot uses Gemini powered by Firebase AI Logic to provide real-time, context-aware answers to election-related questions.

## How the Solution Works
- **Stack**: React (via Vite) + TypeScript.
- **Styling**: Vanilla CSS. No tailwind or heavy libraries ensuring the compiled footprint stays significantly under 1 MB.
- **Progress Persistence (Google Firestore)**: Meaningful progress (selected voter flow, checklist completion) is saved to Google Firestore using a minimal, session-based persistence approach. This ensures progress is not lost on reload without requiring complex authentication. It includes a graceful fallback to local state if Firebase is not configured via `.env` variables.
- **Testing**: Basic component and interaction coverage provided using Vitest and React Testing Library.

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Vanilla CSS (CSS Variables for theming)
- **Icons**: Lucide React
- **Persistence**: Google Firebase (Firestore) for lightweight session and progress storage.
- **AI Assistant**: Google Firebase AI Logic (Vertex AI in Firebase) powering a real-time Gemini-2.5-flash chat assistant.
- **Security & Analytics**: Firebase App Check ensures requests come from an authentic app, and Firebase Analytics is used to measure user engagement (e.g., plans saved, FAQ usage).

## Environment Variables
The application relies on Firebase for both data persistence and the AI logic.

- **Local Development**: Create a `.env` file in the root directory (see `.env.example` for required variables).
- **Production**: A `.env.production` file is included to provide the public Firebase configuration to the production build (e.g. Cloud Run) via Vite. These values are public and safe to expose in client-side code.

## Assumptions Made
1. **Static Dates for MVP**: Election dates in the Timeline component are hardcoded to the 2024 general election to reduce complexity. A production version would require querying a state/district API.
2. **Gemini AI**: The assistant uses Vertex AI in Firebase to provide responses, ensuring secure and scalable AI interactions without exposing raw API keys on the client side.
3. **Deployment Target**: The application includes a `Dockerfile` and `nginx.conf` set up specifically for stateless container deployment on services like Google Cloud Run. 

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Run tests:
   ```bash
   npm run test
   ```

## Docker Deployment
```bash
docker build -t voteready .
docker run -p 8080:8080 voteready
```
