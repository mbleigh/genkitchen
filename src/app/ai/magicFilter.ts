import "./genkit";

import { prompt } from "@genkit-ai/dotprompt";
import { defineFlow } from "@genkit-ai/flow";
import { z } from "zod";
import { FilterSchema } from "../filter/schema";

export const magicFilterFlow = defineFlow(
  {
    name: "magicFilter",
    inputSchema: z.object({ query: z.string(), existing: FilterSchema.optional() }),
  },
  async ({ query, existing }) => {
    const productPrompt = await prompt("productFilter");
    const result = await productPrompt.generate({
      input: {
        existing,
        query,
      },
    });
    console.log("MAGIC:", result.output());
    return result.output();
  }
);
