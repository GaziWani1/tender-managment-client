import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '' , loading}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${className}`}
    >
      { loading ? 'loading' :text}

    </button>
  );
};

export default Button;
