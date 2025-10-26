import React, { useState, useRef } from 'react';
import { ContributionDay, ContributionLevel, TooltipData } from '../types';
import Tooltip from './Tooltip';

interface ActivityCalendarProps {
  data: ContributionDay[];
}

const LEVEL_COLORS: Record<ContributionLevel, string> = {
  0: 'bg-gray-700',
  1: 'bg-emerald-900',
  2: 'bg-emerald-700',
  3: 'bg-emerald-500',
  4: 'bg-emerald-300',
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEK_DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ActivityCalendar: React.FC<ActivityCalendarProps> = ({ data }) => {
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data.length) {
    return <div className="text-gray-400">No activity data available.</div>;
  }

  const firstDate = new Date(data[0].date);
  const startingDayOfWeek = firstDate.getDay();

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    if (!containerRef.current) return;

    const dayRect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate position relative to the container
    const x = dayRect.left - containerRect.left + (dayRect.width / 2);
    const y = dayRect.top - containerRect.top;
    
    setTooltipData({
      x,
      y,
      date: day.date,
      count: day.count,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  const renderMonthLabels = () => {
    const months: { name: string; colStart: number }[] = [];
    let lastMonth = -1;

    data.forEach((day, index) => {
      const date = new Date(day.date);
      const month = date.getMonth();
      if (month !== lastMonth) {
        const weekIndex = Math.floor((startingDayOfWeek + index) / 7);
        // Avoid pushing a month label if it's too close to the previous one
        if (months.length === 0 || weekIndex > months[months.length - 1].colStart) {
            months.push({ name: MONTH_NAMES[month], colStart: weekIndex + 1 });
            lastMonth = month;
        }
      }
    });

    return months.map((month) => (
      <div key={month.name} className="text-xs text-gray-400" style={{ gridColumnStart: month.colStart }}>
        {month.name}
      </div>
    ));
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-y-1 gap-x-2">
        {/* Top-left: Empty */}
        <div></div>

        {/* Top-right: Months */}
        <div className="grid grid-flow-col" style={{ gridAutoColumns: '1rem', gap: '0.25rem' }}>
          {renderMonthLabels()}
        </div>

        {/* Bottom-left: Days of week */}
        <div className="flex flex-col gap-1 text-xs text-gray-400">
          {WEEK_DAY_LABELS.map((day, i) => (
            <div key={day} className={`h-4 w-6 text-left leading-4 ${i % 2 === 1 ? '' : 'opacity-0 sm:opacity-100'}`}>
              {day}
            </div>
          ))}
        </div>
        
        {/* Bottom-right: Contribution grid */}
        <div className="grid grid-flow-col grid-rows-7 gap-1" style={{ gridAutoColumns: '1rem' }}>
          {[...Array(startingDayOfWeek)].map((_, i) => (
            <div key={`empty-start-${i}`} className="w-4 h-4" />
          ))}
          {data.map((day) => (
            <div
              key={day.date}
              className={`w-4 h-4 rounded-sm ${LEVEL_COLORS[day.level]} cursor-pointer`}
              onMouseEnter={(e) => handleMouseEnter(e, day)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>
      </div>
      <Tooltip data={tooltipData} />
    </div>
  );
};

export default ActivityCalendar;