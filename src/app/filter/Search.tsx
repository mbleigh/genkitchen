"use client";

import React, { useState, FormEvent } from "react";

interface SearchProps {
  onSubmit: (query: string) => Promise<string> | void;
}

const Search: React.FC<SearchProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery((await onSubmit(query)) || "");
  };

  return (
    <form className="w-full max-w-4xl mx-auto mt-12 mb-8" onSubmit={handleSubmit}>
      <div className="flex items-center">
        <div className="relative flex-grow mr-4">
          <div className="rounded-full bg-gradient-to-br from-blue-300 to-pink-200 p-0.5">
            <input
              type="text"
              className="w-full rounded-full px-4 py-2"
              placeholder="What are you looking for?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-gradient-to-br from-blue-500 to-pink-300 rounded-full font-bold"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
