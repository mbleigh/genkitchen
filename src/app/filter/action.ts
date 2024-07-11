"use server";

import { runFlow } from "@genkit-ai/flow";
import { magicFilterFlow } from "../ai/magicFilter";
import { Filter } from "./schema";

export async function magicFilter(input: { query: string; existing?: Filter }) {
  return runFlow(magicFilterFlow, input);
}
