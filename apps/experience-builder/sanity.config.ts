import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";
import { structure } from "./desk/structure";

export default defineConfig([
  {
    name: "experience-builder",
    title: "Experience Builder",
    projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
    dataset: import.meta.env.SANITY_STUDIO_DATASET,
    basePath: "/",
    server: {
      port: Number.parseInt(import.meta.env.SANITY_STUDIO_PORT),
    },
    plugins: [structureTool({ structure }), visionTool()],
    schema: { types: schemaTypes },
  },
  // Add additional workspaces here to enable the dropdown
]);
