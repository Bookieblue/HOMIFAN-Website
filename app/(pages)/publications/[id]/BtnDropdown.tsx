import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const BtnDropdown: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-purple-50 max-w-52 border-purple-50 text-white hover:font-bold p-3 flexCenter gap-1 relative rounded-lg"
      >
        BUY YOUR COPY NOW
        <ChevronDown strokeWidth={3} absoluteStrokeWidth className="size-4" />
      </button>
      {dropdownOpen && (
        <div className="absolute left-24 top-full mt-2 w-40 bg-white-50 shadow-lg rounded-md overflow-hidden">
          Hi
        </div>
      )}
    </div>
  );
};

export default BtnDropdown;
