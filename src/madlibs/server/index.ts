import { runFlow } from "@genkit-ai/flow";
import { Router } from "express";
import { z } from "@genkit-ai/core/schema";
import { promptRef } from "@genkit-ai/dotprompt";
import { defineFlow } from "@genkit-ai/flow";

import "../../common/server/genkit.js";
import { flowRoute } from "../../common/server/util.js";

const madlibsPrompt = promptRef("madlibs");
const madlibsSolvePrompt = promptRef("madlibs_solve");

export const madlibsGenerateFlow = defineFlow(
  {
    name: "madlibsGenerate",
    inputSchema: z.object({ subject: z.string().optional() }),
    outputSchema: z.object({
      title: z.string(),
      blanks: z.array(z.string()),
      story: z.array(z.string()),
    }),
  },
  async (input) => {
    const result = await madlibsPrompt.generate({ input });

    const [_, title, template] = result.text().split(/^### (.*)$/gim);
    const parts = template.trim().split(/\[\[([^\]]+)\]\]/gim);
    const blanks: string[] = [];
    const story: string[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      story.push(parts[i]);
      if (parts[i + 1]) blanks.push(parts[i + 1]);
    }

    return {
      title,
      blanks,
      story,
    };
  }
);

export const madlibsSolveFlow = defineFlow(
  {
    name: "madlibsSolve",
    inputSchema: z.object({ blanks: z.array(z.string()) }),
    outputSchema: z.array(z.string()),
  },
  async (input) => {
    const result = await madlibsSolvePrompt.generate({ input });
    return result
      .text()
      .trim()
      .split("\n")
      .map((line) => line.trim())
      .filter((s) => !!s);
  }
);

const app = Router();
flowRoute(app, "/api/madlibs/generate", madlibsGenerateFlow);
flowRoute(app, "/api/madlibs/solve", madlibsSolveFlow);

export const madlibsDemo = app;
