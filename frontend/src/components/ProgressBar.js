import React from 'react';

const ProgressBar = ({ progress }) => {
  const getProgressColor = (progress) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    const red = Math.round(255 * (1 - clampedProgress / 100));
    const green = Math.round(255 * (clampedProgress / 100));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <div className="w-full flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${progress}%`,
          backgroundColor: getProgressColor(progress),
        }}
      />
    </div>
  );
};

export default ProgressBar;