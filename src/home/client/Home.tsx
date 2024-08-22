import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2 className="pb-2 border-b border-b-slate-300 max-w-xl mx-auto text-4xl font-bold text-center mt-12">
        Genkitchen
      </h2>
      <ul className="max-w-xl mx-auto">
        <li>
          <Link
            to="/analyzeImage"
            className="block p-4 text-center border border-slate-300 rounded-xl my-4 text-xl"
          >
            Analyze an Image
          </Link>
          <Link
            to="/madlibs"
            className="block p-4 text-center border border-slate-300 rounded-xl my-4 text-xl"
          >
            Play Mad Libs
          </Link>
        </li>
      </ul>
    </div>
  );
}
