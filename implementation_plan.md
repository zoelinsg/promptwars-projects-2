# VoteReady: Interactive Web Assistant Plan

VoteReady is an interactive, educational web assistant built with React and TypeScript, designed to guide users through the election process with a responsive, modern UI.

## Goal

To build a lightweight, visually appealing, and highly interactive application that educates users on the voting process. The solution will include personalized flows, an interactive timeline, step-by-step guides, FAQs, and a Gemini-powered assistant to clarify any uncertainties. The repository will be kept minimal (< 1 MB), fully tested, and ready for deployment on Google Cloud Run.

## Proposed Architecture and Stack
- **Framework**: React + TypeScript (Initialized via Vite)
- **Styling**: Vanilla CSS with modern aesthetics (glassmorphism, CSS variables, micro-animations, accessible colors), adhering to instructions to avoid heavy CSS frameworks without explicit request.
- **Routing**: Minimal client-side state/routing for different flows.
- **AI Integration**: Gemini API (`@google/generative-ai` or `fetch`) for natural language assistance.
- **Testing**: Vitest + React Testing Library for fast, lightweight testing.
- **Deployment**: Dockerfile + Nginx configuration targeting Google Cloud Run.

## User Review Required

> [!WARNING]
> Please review the plan below. The Gemini integration will require an API key to function. During deployment or local testing, you will need to provide `VITE_GEMINI_API_KEY` in an `.env` file. Do you have a Gemini API key ready for this, or should the app use a mocked AI response if the key is not provided?

> [!IMPORTANT]
> To ensure the repository stays strictly under 1 MB, we will prioritize SVG icons over image assets, and avoid adding any large npm packages.

## Proposed Changes

### Configuration and Setup
- Standard Vite React-TS setup
- Production Dockerfile and Nginx setup for Google Cloud Run
- Testing setup with Vitest

### Core App Component
#### [NEW] `src/App.tsx` & `src/App.css`
Main container with a modern, glassmorphic layout, routing logic mapped to different journey flows.

### Feature Components
#### [NEW] `src/components/PersonalizedFlow.tsx`
A welcoming questionnaire routing users based on their status (First-time voter, Registered, Need help identifying).
#### [NEW] `src/components/Timeline.tsx`
A horizontal or vertical visual timeline for important election dates with CSS animations.
#### [NEW] `src/components/JourneyGuide.tsx`
A stepper visualization to guide the user step-by-step depending on their personalized flow result.
#### [NEW] `src/components/Checklist.tsx`
A stateful "to-do" checklist for users, tracking their registration and voting tasks.
#### [NEW] `src/components/FAQ.tsx`
An expandable accordion of frequently asked questions built natively to keep bundle size low.
#### [NEW] `src/components/GeminiAssistant.tsx`
A chatbot widget embedded or floating that uses Gemini to explain election contexts contextually based on user inquiries.

### Styling System
#### [NEW] `src/index.css`
Global typography (Google Fonts - Inter/Outfit), CSS custom variables for vibrant themes, dark mode support, and basic structural resets.

### Testing and Deployment
#### [NEW] `vite.config.ts`, `vitest.config.ts`
Configuration.
#### [NEW] `Dockerfile` & `nginx.conf`
Multi-stage build that compiles static assets and serves them via an unprivileged Nginx layer for Google Cloud Platform.
#### [NEW] `src/__tests__/App.test.tsx`
Tests ensuring accessibility and core component rendering.

## Open Questions

> [!CAUTION]
> 1. Do you need the app to support Spanish or other languages as part of the accessibility requirements, or is English sufficient?
> 2. Should the Timeline dates be hardcoded for the 2024/latest general election, or should the user be prompted for their state to load mock regional dates?

## Verification Plan

### Automated Tests
- Run `npm run test` using vitest to cover the main rendering logic of all components.

### Manual Verification
- Verify the layout remains responsive from mobile to desktop.
- Navigate the full user personalized flows to ensure correctly displayed steps.
- Validate interaction with the Gemini API.
- Verify Docker build locally using `docker build -t voteready .`

Please review this implementation plan and let me know if you approve and want to start execution!
