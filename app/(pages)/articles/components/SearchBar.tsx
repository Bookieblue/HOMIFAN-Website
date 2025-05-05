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
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 my-8 px-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for article"
        className="w-full sm:max-w-md px-4 py-2 border border-gray-300 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="w-full sm:w-auto bg-purple-50 text-white px-4 py-2 rounded-md sm:rounded-l-none sm:rounded-r-md"
      >
        Search Now
      </button>
    </div>
  );
};

export default SearchBar;
