
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 sm:px-8 border-b border-gray-700 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex flex-wrap">
            <div className="w-4 h-4 bg-red-500 rounded-tl-full"></div>
            <div className="w-4 h-4 bg-orange-500 rounded-tr-full"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-bl-full"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-br-full"></div>
        </div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-100">Figma Activity Tracker</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-sm text-gray-300">Jane Doe</span>
        <img
          src="https://picsum.photos/seed/janedoe/40/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-600"
        />
      </div>
    </header>
  );
};

export default Header;
