# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a0800af7-9503-41fa-b4a5-df8269df3228

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a0800af7-9503-41fa-b4a5-df8269df3228) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Backend (API) — run locally

The repository includes a small Express + TypeScript backend under `src/` exposing a few endpoints used by the frontend:

- GET /api/health — health check
- GET/POST /api/theme — get/set theme (body: { theme: 'dark'|'light' })
- GET/POST /api/lang — get/set language (body: { language: 'tr'|'en'|'de'|'es' })
- POST /api/ai/stream — AI streaming proxy (optional OPENAI_API_KEY required for real OpenAI streaming)
- GET/POST /api/typewriter/frames — returns frames for a typewriter effect
- GET/POST /api/typewriter/stream — SSE stream of typewriter frames

How to run the backend locally (PowerShell):

```powershell
# install deps
npm install

# run backend in dev (ts-node)
npm run dev:backend

# or build and run compiled backend
npm run build:backend
npm run start:backend
```

Run the test suite:

```powershell
npm test
```

Environment
- Create a `.env` file in the project root and set `OPENAI_API_KEY` if you want the AI streaming to proxy to OpenAI.

CI
I included a test workflow (see `.github/workflows/ci.yml`) that installs dependencies and runs the test suite on push/pull requests.


**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a0800af7-9503-41fa-b4a5-df8269df3228) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
