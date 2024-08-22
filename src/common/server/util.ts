import { z } from "@genkit-ai/core/schema";
import { Flow, runFlow } from "@genkit-ai/flow";
import { IRouter, Request, Response } from "express";

export function flowRoute<I extends z.ZodTypeAny, O extends z.ZodTypeAny, S extends z.ZodTypeAny>(
  app: IRouter,
  path: string,
  flow: Flow<I, O, S>
) {
  app.post(path, async (req: Request, res: Response) => {
    res.json(await runFlow<I, O, S>(flow, req.body));
  });
  return app;
}
