import { configureGenkit } from "@genkit-ai/core";
import { dotprompt } from "@genkit-ai/dotprompt";
import { googleAI } from "@genkit-ai/googleai";
// import { vertexAI } from "@genkit-ai/vertexai";

configureGenkit({
  plugins: [
    googleAI(),
    // vertexAI({ location: "us-central1", projectId: "bleigh-genkit-test" }),
    dotprompt(),
  ],
  logLevel: "warn",
  enableTracingAndMetrics: true,
});
