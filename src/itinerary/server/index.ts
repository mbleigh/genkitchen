import { prompt } from "@genkit-ai/dotprompt";
import { defineFlow } from "@genkit-ai/flow";

import destinations from "../data.js";
import { flowRoute } from "../../common/server/util.js";
import { Router } from "express";
import { z } from "@genkit-ai/core/schema";

export const UserPreferencesSchema = z.object({
  energyLevel: z.union([z.string(), z.number()]),
  mustDo: z.array(z.string()).optional(),
  notes: z.string().optional(),
});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const GenerateItineraryInputSchema = z.object({
  destination: z.string(),
  preferences: UserPreferencesSchema,
  previousPreferences: UserPreferencesSchema.optional(),
  previousItinerary: z.any().optional(),
});
export type GenerateItineraryInput = z.infer<typeof GenerateItineraryInputSchema>;

export const ActivitySchema = z.object({
  ref: z.string().optional(),
  type: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  title: z.string(),
  description: z.string(),
  rationale: z.string(),
  mustDo: z.boolean(),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const GenerateItineraryOutputSchema = z.object({
  activities: z.array(ActivitySchema),
});
export type GenerateItineraryOutput = z.infer<typeof GenerateItineraryOutputSchema>;

export const generateItineraryFlow = defineFlow(
  {
    name: "generateItinerary",
    inputSchema: GenerateItineraryInputSchema,
    outputSchema: GenerateItineraryOutputSchema,
  },
  async (input) => {
    const p = await prompt("generateItinerary");
    const result = await p.generate({
      input: {
        preferences: input.preferences,
        previousItinerary: input.previousItinerary,
        previousPreferences: input.previousPreferences,
        destination: (destinations as any)[input.destination],
      },
    });
    return result.output() as GenerateItineraryOutput;
  }
);

export const ReviseActivityInputSchema = GenerateItineraryInputSchema.extend({
  activityIndex: z.number(),
  revisionNotes: z.string(),
});
export type ReviseActivityInput = z.infer<typeof ReviseActivityInputSchema>;

export const ReviseActivityOutputSchema = z.object({ activity: ActivitySchema });
export type ReviseActivityOutput = z.infer<typeof ReviseActivityOutputSchema>;
export const reviseActivityFlow = defineFlow(
  {
    name: "reviseActivity",
    inputSchema: ReviseActivityInputSchema,
    outputSchema: ReviseActivityOutputSchema,
  },
  async (input) => {
    const p = await prompt("reviseActivity");
    console.log("ACTIVITY TO TARGET:", input.previousItinerary?.activities?.[input.activityIndex]);
    const result = await p.generate({
      input: {
        preferences: input.preferences,
        activity: input.previousItinerary?.activities?.[input.activityIndex],
        revisionNotes: input.revisionNotes,
        destination: (destinations as any)[input.destination],
      },
    });
    return result.output() as ReviseActivityOutput;
  }
);

const app = Router();

flowRoute(app, "/api/itinerary/generate", generateItineraryFlow);
flowRoute(app, "/api/itinerary/revise", reviseActivityFlow);

export const itineraryDemo = app;
