
import React from 'react';
import { CalendarHeart } from 'lucide-react';

const DateHeader = () => {
  return (
    <div className="w-full flex justify-center items-center mb-8 gap-3">
      <CalendarHeart className="w-9 h-9 text-romantic-500" />
      <h1 className="text-3xl md:text-4xl font-bold text-lavender-700">Date Bucket List</h1>
    </div>
  );
};

export default DateHeader;
