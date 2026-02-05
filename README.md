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
- Create `.env.local` in each studio:
  - `apps/community-builder/.env.local`
  - `apps/experience-builder/.env.local`
- Required keys:
  - `SANITY_STUDIO_PROJECT_ID`
  - `SANITY_STUDIO_DATASET`
