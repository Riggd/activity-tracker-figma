
import React, { useState, useEffect } from 'react';
import { ContributionDay } from '../types';
import { generateMockData } from '../lib/mockData';
import ActivityCalendar from './ActivityCalendar';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);

  useEffect(() => {
    // Generate data for the last 90 days
    const mockData = generateMockData(90);
    setData(mockData);
    setTotalContributions(mockData.reduce((sum, day) => sum + day.count, 0));
  }, []);

  return (
    <main className="p-4 sm:p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-100">Your Activity</h2>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4 sm:gap-0">
          <h3 className="text-lg font-medium text-gray-200">{totalContributions} contributions in the last 90 days</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-gray-700 border border-gray-600"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-900"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-700"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
            <div className="w-3 h-3 rounded-sm bg-emerald-300"></div>
            <span>More</span>
          </div>
        </div>
        <div className="pb-2">
          <ActivityCalendar data={data} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
