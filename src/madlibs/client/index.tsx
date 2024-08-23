import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { post } from "../../common/client/util.js";

interface Game {
  title: string;
  blanks: string[];
  story: string[];
}

async function generateMadLib(subject: string) {
  return post("/api/madlibs/generate", { subject });
}

async function generateSolution(game: Game) {
  return post("/api/madlibs/solve", { blanks: game.blanks });
}

export default function MadLibs() {
  const [game, setGame] = useState<Game | null>(null);
  const [answers, setAnswers] = useState<string[] | null>(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newGame = await generateMadLib(subject);
      setGame(newGame);
      setAnswers(null);
    } catch (error) {
      console.error("Error generating madlib:", error);
    }
    setLoading(false);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newAnswers = game!.blanks.map((blank, i) => formData.get(`blank${i}`) as string);
    setAnswers(newAnswers);
  };

  const handleAutoFill = async () => {
    if (!game) return;
    setLoading(true);
    try {
      const solution = await generateSolution(game);
      setAnswers(solution);
    } catch (error) {
      console.error("Error generating solution:", error);
    }
    setLoading(false);
  };

  if (!game) {
    return (
      <form onSubmit={handleSubjectSubmit} className="space-y-4 p-4 max-w-xl mx-auto text-center">
        <div className="flex justify-center mt-12 mb-8">
          <Link
            to="/"
            className="mx-auto flex text-sm border border-slate-300 text-slate-600 rounded-lg p-2 items-center"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>
        </div>
        <h1 className="text-4xl md:text-6xl text-center mt-12 mb-8">Gemini Mad Libs</h1>
        <div>
          <label htmlFor="subject" className="block text-xl text-center text-gray-700 py-4">
            Enter a subject for your story:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="text-2xl p-4 rounded-lg border border-slate-300 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate MadLibs"}
        </button>
      </form>
    );
  }

  if (game && !answers) {
    return (
      <div className="space-y-4 mx-auto max-w-xl">
        <h2 className="text-4xl font-bold mt-12 mb-8 text-center">{game.title}</h2>
        <form onSubmit={handleAnswerSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center p-4">
            {game.blanks.map((blank, index) => (
              <label
                key={index}
                htmlFor={blank}
                className="block text-sm font-light text-center text-gray-700 border rounded-lg p-2 m-2 w-full md:w-auto"
              >
                <div>{blank}</div>
                <input
                  type="text"
                  id={blank}
                  name={`blank${index}`}
                  className="text-xl w-full md:w-auto"
                  required
                />
              </label>
            ))}
          </div>
          <div className="flex space-x-4 text-center justify-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Answers
            </button>
            <button
              type="button"
              onClick={handleAutoFill}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? "Generating..." : "Do it for me"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (game && answers) {
    return (
      <div className="space-y-4 max-w-xl mx-auto p-4">
        <h2 className="text-4xl mt-12 mb-8 text-center font-bold">{game.title}</h2>
        <div className="text-xl md:text-2xl">
          {game.story.map((part, index) => (
            <React.Fragment key={index}>
              <span className="inline mb-4">{part}</span>
              {index < answers.length && (
                <span className="inline-block align-top mb-3 font-bold text-indigo-600 mx-2 text-center">
                  {answers[index]}
                  <span className="block text-xs text-gray-500 font-light">
                    {game.blanks[index]}
                  </span>
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div class="flex justify-center">
          <button
            onClick={() => {
              setAnswers(null);
            }}
            className="block mx-4 justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Again
          </button>
          <button
            onClick={() => {
              setGame(null);
              setAnswers(null);
              setSubject("");
            }}
            className="block mx-4 justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return null;
}
