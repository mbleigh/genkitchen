"use server";

import { configureGenkit, defineSchema } from "@genkit-ai/core";
import { dotprompt } from "@genkit-ai/dotprompt";
import { vertexAI } from "@genkit-ai/vertexai";
import { FilterSchema } from "../filter/schema";

configureGenkit({
  plugins: [
    vertexAI({ projectId: "bleigh-genkit-test", location: "us-central1" }),
    dotprompt({ dir: "src/app/ai/prompts" }),
  ],
  enableTracingAndMetrics: true,
});

defineSchema("Filter", FilterSchema);
