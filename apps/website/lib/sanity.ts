import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const hasSanityConfig = Boolean(projectId && dataset);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-06-01",
      useCdn: true
    })
  : null;

const builder = hasSanityConfig ? imageUrlBuilder({ projectId, dataset }) : null;

export const urlForImage = (source: SanityImageSource) => (builder ? builder.image(source) : null);
