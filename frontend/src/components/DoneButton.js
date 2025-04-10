import React from 'react';

const DoneButton = ({ onDone, disabled }) => {
  return (
    <button
      onClick={onDone}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}
    >
      Completar
    </button>
  );
};

export default DoneButton;