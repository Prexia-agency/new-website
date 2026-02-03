import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";

const projectId = "j855mcyw";
const dataset = "production";

export default defineConfig({
  name: "default",
  title: "AK Blog Studio",
  projectId,
  dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});


