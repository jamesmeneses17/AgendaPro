import React from 'react';

const WindowControls = () => {
  return (
    <div className="flex justify-end items-center h-8 bg-blue-500">
      <button
        className="w-8 h-8 flex justify-center items-center hover:bg-blue-400"
        onClick={() => window.api.minimize()}
      >
        <span className="text-white">—</span>
      </button>
      <button
        className="w-8 h-8 flex justify-center items-center hover:bg-blue-400"
        onClick={() => window.api.toggleMaximize()}
      >
        <span className="text-white">☐</span>
      </button>
      <button
        className="w-8 h-8 flex justify-center items-center hover:bg-red-500"
        onClick={() => window.api.close()}
      >
        <span className="text-white">×</span>
      </button>
    </div>
  );
};

export default WindowControls;
