import { createClient } from "@sanity/client";

const projectId = process.env.EXPO_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.EXPO_PUBLIC_SANITY_DATASET ?? "production";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-06-01",
      useCdn: false // Disabled for fresher data with polling
    })
  : null;
