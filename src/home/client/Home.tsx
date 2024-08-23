import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h2 className="pb-2 border-b border-b-slate-300 max-w-xl mx-auto text-4xl font-bold text-center mt-12">
        Genkitchen
      </h2>
      <ul className="max-w-xl mx-auto p-4">
        <li>
          <Link
            to="/analyzeImage"
            className="block p-4 text-center border border-blue-gray-100 shadow-sm rounded-xl my-4 text-xl"
          >
            Analyze an Image
          </Link>
          <Link
            to="/madlibs"
            className="block p-4 text-center border border-blue-gray-100 shadow-sm rounded-xl my-4 text-xl"
          >
            Play Mad Libs
          </Link>
          <Link
            to="/filter"
            className="block p-4 text-center border border-blue-gray-100 shadow-sm rounded-xl my-4 text-xl"
          >
            Natural Language Product Filter
          </Link>
          <Link
            to="/itinerary"
            className="block p-4 text-center border border-blue-gray-100 shadow-sm rounded-xl my-4 text-xl"
          >
            Itinerary Planner
          </Link>
        </li>
      </ul>
    </div>
  );
}
