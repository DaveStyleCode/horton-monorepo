# drhorton monorepo

Apps

- apps/experience-builder: Sanity Studio for Experience Builder
- apps/community-builder: Sanity Studio for Community Builder
- apps/website: Next.js site powered by Experience Builder
- apps/mobile: React Native (Expo) app powered by Experience Builder

Tooling

- Turborepo for task orchestration
- Tailwind CSS for styling (web and mobile via NativeWind)
- Biome for formatting and linting

Sanity

- Both studios are separate UIs but should point at the same dataset.
- Copy `.env.example` to `.env.local` in each studio:
  - `apps/community-builder/.env.example` -> `.env.local`
  - `apps/experience-builder/.env.example` -> `.env.local`
- Required keys:
  - `SANITY_STUDIO_PROJECT_ID`
  - `SANITY_STUDIO_DATASET`
  - `SANITY_STUDIO_PORT` (3333 and 3334 for community and experience builders respectively)

Next.js

- Copy `.env.example` to `.env.local` in the website app:
  - `apps/website/.env.example` -> `.env.local`
- Required keys:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`

React Native

- Copy `.env.example` to `.env.local` in the mobile app:
  - `apps/mobile/.env.example` -> `.env.local`
- Required keys:
  - `EXPO_PUBLIC_SANITY_PROJECT_ID`
  - `EXPO_PUBLIC_SANITY_DATASET`
