import React, { useRef, useState } from "react";
import ImageField from "./ImageField.js";
import HighlightArea from "./HighlightArea.js";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ImageObject } from "../server/index.js";
interface Analysis {
  objects: ImageObject[];
}

export default function AnalyzeImage() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [selectedObject, setSelectedObject] = useState<ImageObject | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function borderColor(o: ImageObject) {
    let color = selectedObject === o ? o.colors[0] : "transparent";
    if (color === "white") color = "black";
    return color;
  }

  async function analyzeImage() {
    const body = new FormData(formRef.current!);
    setAnalysis(null);
    setSelectedObject(null);
    setLoading(true);
    const response = await fetch("/api/analyzeImage", {
      method: "post",
      body,
    });

    const analysis = (await response.json()) as Analysis;
    setAnalysis(analysis);
    setSelectedObject(analysis.objects[0]);
    setLoading(false);
  }

  return (
    <div className="flex flex-col overflow-hidden h-screen w-screen">
      <header className="border-b shadow-md flex items-center">
        <Link to="/">
          <ArrowLeft className="ml-4" />
        </Link>
        <h1 className="text-xl font-bold p-4 flex-1">Analyze an image with Gemini</h1>
        <p className="p-4">Powered by Firebase Genkit</p>
      </header>
      <div className="flex p-8 overflow-hidden flex-1">
        <form ref={formRef} className="flex-1 min-h-screen">
          <div className="relative w-full max-w-xl mx-auto mt-16">
            <ImageField name="image" onChange={analyzeImage} />
            {selectedObject && <HighlightArea bounds={selectedObject} />}
          </div>
        </form>
        {(loading || analysis) && (
          <div className="flex-1 overflow-y-auto">
            {loading && (
              <div
                role="status"
                className="border border-slate-200 rounded-xl mt-8 max-w-sm text-center flex items-center justify-center mx-auto p-6"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-slate-400 ml-2">Analyzing Image&hellip;</span>
              </div>
            )}
            {analysis && (
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-center mb-4 text-sm">
                  Click an item to highlight it in the image&hellip;
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.objects.map((o, i) => (
                    <div
                      key={i}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg border-2 transition-shadow duration-300"
                      style={{ borderColor: borderColor(o) }}
                      onClick={() => {
                        if (selectedObject === o) {
                          setSelectedObject(null);
                          return;
                        }
                        setSelectedObject(o);
                        console.log(o);
                      }}
                    >
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">{o.name}</h3>
                      <p className="text-sm text-slate-600">{o.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
