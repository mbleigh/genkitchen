import { generate } from "@genkit-ai/ai";
import { z } from "@genkit-ai/core/schema";
import { gemini15Flash } from "@genkit-ai/googleai";
import { IRouter, Request, Response, Router } from "express";

import "../../common/server/genkit.js";
import multer from "multer";

export const ImageObjectSchema = z.object({
  name: z.string().describe("a short but unique name of the object"),
  description: z.string().describe("a single sentence detailed description of the object"),
  text: z.string().describe("any written text on the object").nullish(),
  colors: z
    .array(z.string())
    .describe(
      "a list of one or more valid CSS named colors that make up the object, from most to least prevalent"
    ),
  yMin: z
    .number()
    .describe(
      "the percent vertical position of the top of the object within the image (0 = top of image, 100 = bottom of image)"
    ),
  yMax: z.number().describe("the vertical position of the bottom of the object within the image"),
  xMin: z.number().describe("the horizontal position of the top of the object within the image"),
  xMax: z.number().describe("the horizontal position of the bottom of the object within the image"),
});

export type ImageObject = z.infer<typeof ImageObjectSchema>;

const app = Router();
const upload = multer({ limits: { fileSize: 7 * 1_048_576 } });

app.post("/api/analyzeImage", upload.single("image"), async (req, res) => {
  if (!req.file) throw new Error("Must upload a file.");

  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  const result = await generate({
    model: gemini15Flash,
    prompt: [{ text: "Identify all the objects in this image." }, { media: { url: dataUri } }],
    output: {
      schema: z.object({
        objects: z
          .array(ImageObjectSchema)
          .describe("an array of objects that were detected in the screen"),
      }),
    },
  });
  res.send(result.output());
});

export const analyzeImageDemo = app;
