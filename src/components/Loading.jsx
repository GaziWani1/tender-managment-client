import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin"></div>
        <div className="ml-4 text-xl text-blue-600">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
