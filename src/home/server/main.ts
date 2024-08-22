import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import ViteExpress from "vite-express";
import { analyzeImageDemo } from "../../analyzeImage/server/index.js";
import { madlibsDemo } from "../../madlibs/server/index.js";
import { productFilterDemo } from "../../filter/server/index.js";

const app = express();
app.use(bodyParser.json());
app.use(analyzeImageDemo);
app.use(madlibsDemo);
app.use(productFilterDemo);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err.message || err });
});

const port = parseInt(process.env.PORT || "3000");
ViteExpress.listen(app, port, () => console.log(`Server is listening at http://localhost:${port}`));
