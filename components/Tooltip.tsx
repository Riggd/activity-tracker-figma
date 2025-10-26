import React from 'react';
import { TooltipData } from '../types';

interface TooltipProps {
  data: TooltipData | null;
}

const Tooltip: React.FC<TooltipProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { x, y, date, count } = data;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="absolute z-[9999] p-2 text-sm text-center text-white bg-gray-900 border border-gray-600 rounded-md shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2"
      style={{ left: x, top: y }}
    >
      <span className="font-bold">{count} contributions</span>
      <span className="block text-xs text-gray-400">{formattedDate}</span>
    </div>
  );
};

export default Tooltip;
