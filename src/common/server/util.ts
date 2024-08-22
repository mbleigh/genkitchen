import { Flow, runFlow } from "@genkit-ai/flow";
import { IRouter, Request, Response } from "express";

export function flowRoute<I,O,S>(app: IRouter, path: string, flow: Flow<I,O,S>) {
  return async (req: Request, res: Response) {
    res.json(await runFlow<I,O,S>(flow, req.body));
  }
}