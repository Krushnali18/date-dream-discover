
import React from 'react';
import { DateIdea } from './DateForm';
import DateCard from './DateCard';
import { Heart } from 'lucide-react';

interface DateListProps {
  ideas: DateIdea[];
  onDeleteIdea: (id: string) => void;
}

const DateList: React.FC<DateListProps> = ({ ideas, onDeleteIdea }) => {
  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <Heart className="h-12 w-12 text-romantic-300 heartbeat" />
        <h3 className="text-xl font-medium text-lavender-500">Your bucket list is empty</h3>
        <p className="text-muted-foreground max-w-sm">
          Add your first date idea to start planning magical moments together
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ideas.map((idea) => (
        <DateCard 
          key={idea.id} 
          idea={idea} 
          onDelete={onDeleteIdea} 
        />
      ))}
    </div>
  );
};

export default DateList;
