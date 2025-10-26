
import { ContributionDay, ContributionLevel } from '../types';

const getLevelForCount = (count: number): ContributionLevel => {
  if (count >= 20) return 4;
  if (count >= 6) return 3;
  if (count >= 2) return 2;
  if (count >= 1) return 1;
  return 0;
};

export const generateMockData = (days: number): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Skew randomness towards lower numbers
    const randomFactor = Math.random();
    let count = 0;
    if (randomFactor > 0.3) { // 70% chance of some activity
      if (randomFactor > 0.95) { // 5% chance of high activity
        count = Math.floor(Math.random() * 20) + 20;
      } else if (randomFactor > 0.8) { // 15% chance of medium activity
        count = Math.floor(Math.random() * 15) + 6;
      } else if (randomFactor > 0.5) { // 30% chance of low activity
        count = Math.floor(Math.random() * 4) + 2;
      } else { // 20% chance of minimal activity
        count = 1;
      }
    }
    
    // Ensure weekends have less activity
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      if (Math.random() > 0.3) { // 70% chance of no activity on weekends
        count = 0;
      }
    }

    data.push({
      date: date.toISOString().split('T')[0],
      count,
      level: getLevelForCount(count),
    });
  }
  
  return data;
};
