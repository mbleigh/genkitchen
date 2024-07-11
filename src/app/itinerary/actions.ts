"use server";

import { runFlow } from "@genkit-ai/flow";
import {
  GenerateItineraryInput,
  ReviseActivityInput,
  generateItineraryFlow,
  reviseActivityFlow,
} from "../ai/generateItinerary";

export async function generateItinerary(input: GenerateItineraryInput) {
  return runFlow(generateItineraryFlow, input);
}

export async function reviseItinerary(input: ReviseActivityInput) {
  return runFlow(reviseActivityFlow, input);
}
