import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex items-center justify-center my-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for article"
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-purple-50 text-white-50 px-4 py-2 rounded-r-md "
      >
        Search Now
      </button>
    </div>
  );
};

export default SearchBar;
