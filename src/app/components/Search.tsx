"use client";

import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <form className="flex items-center border rounded-full px-3 py-1 hover:border-red-500 transition-colors">
      <i className="fas fa-search text-gray-400"></i>
      <input
        type="text"
        placeholder="Search dashboard..."
        value={searchQuery}
        onChange={handleSearch}
        className="ml-2 outline-none w-64 text-gray-800 font-medium text-base placeholder-gray-400 focus:placeholder-gray-300"
      />
    </form>
  );
};

export default Search;
