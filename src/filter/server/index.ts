import { promptRef } from "@genkit-ai/dotprompt";
import { defineFlow } from "@genkit-ai/flow";
import { FilterSchema } from "../schema.js";
import { Router } from "express";
import { flowRoute } from "../../common/server/util.js";

import "../../common/server/genkit.js";
import { defineSchema } from "@genkit-ai/core";
import { z } from "@genkit-ai/core/schema";

defineSchema("Filter", FilterSchema);

const productPrompt = promptRef("productFilter");

export const magicFilterFlow = defineFlow(
  {
    name: "magicFilter",
    inputSchema: z.object({ query: z.string(), existing: FilterSchema.optional() }),
  },
  async ({ query, existing }) => {
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

const app = Router();

flowRoute(app, "/api/filter", magicFilterFlow);

export const productFilterDemo = app;
