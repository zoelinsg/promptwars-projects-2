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
4. **Assistance**: A built-in chatbot simulates an AI assistant ready to answer specific questions, making the system interactive rather than a static site.

## How the Solution Works
- **Stack**: React (via Vite) + TypeScript.
- **Styling**: Vanilla CSS. No tailwind or heavy libraries ensuring the compiled footprint stays significantly under 1 MB.
- **Assistant Integration (Mocked)**: The GeminiAssistant component provides a demo conversational UI. Based on the constraints, it currently provides mocked fast responses for keywords like "register", "deadline", and "id". It is structured so that adding the `@google/generative-ai` SDK and an API key later is a drop-in code replacement.
- **Progress Persistence (Google Firestore)**: Meaningful progress (selected voter flow, checklist completion) is saved to Google Firestore using a minimal, session-based persistence approach. This ensures progress is not lost on reload without requiring complex authentication. It includes a graceful fallback to local state if Firebase is not configured via `.env` variables.
- **Testing**: Basic component and interaction coverage provided using Vitest and React Testing Library.

## Assumptions Made
1. **Static Dates for MVP**: Election dates in the Timeline component are hardcoded to the 2024 general election to reduce complexity. A production version would require querying a state/district API.
2. **Mock AI**: The Gemini integration simulates a backend connection to keep the demo self-contained and avoids exposing real API keys.
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
