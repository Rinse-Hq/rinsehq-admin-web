# rinsehq

Next.js app for laundry service management with **clean architecture**, **auth**, and a **dashboard layout**.

## Architecture

```
src/
├── domain/           # Entities & repository interfaces (no frameworks)
├── application/      # Use cases & DTOs
├── infrastructure/   # Auth, persistence, DI container
├── presentation/     # UI components, server actions
└── app/              # Next.js App Router (routes)
```

Auth flows go through use cases (`SignUpUseCase`, `SignInUseCase`) and an `AuthRepository` interface. The default implementation is in-memory for local development; swap it for a database adapter without changing domain or application code.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **Sign up:** `/signup`
- **Log in:** `/login`
- **Dashboard:** `/dashboard` (protected)

Set `AUTH_SECRET` in `.env.local` for production (see `.env.example`).

## Scripts

| Command       | Description        |
|---------------|--------------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
# rinsehq-admin-web
