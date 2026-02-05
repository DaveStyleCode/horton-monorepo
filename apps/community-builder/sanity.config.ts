import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./desk/structure";

export default defineConfig({
  name: "community-builder",
  title: "Community Builder",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID ?? "eeu1q4xq",
  dataset: import.meta.env.SANITY_STUDIO_DATASET ?? "production",
  basePath: "/",
  server: {
    port: 3333,
  },
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
});
