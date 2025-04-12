
import React from 'react';
import { DateIdea } from './DateForm';
import { Button } from '@/components/ui/button';
import { Trash, Calendar, Clock, MapPin, Share } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface DateCardProps {
  idea: DateIdea;
  onDelete: (id: string) => void;
}

const DateCard: React.FC<DateCardProps> = ({ idea, onDelete }) => {
  const { toast } = useToast();

  const handleShare = () => {
    let message = `Date idea: ${idea.idea}`;
    
    if (idea.date) {
      message += `\nDate: ${format(idea.date, 'PPP')}`;
    }
    
    if (idea.time) {
      message += `\nTime: ${idea.time}`;
    }
    
    if (idea.location) {
      message += `\nLocation: ${idea.location}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Sharing initiated!",
      description: "Opening WhatsApp to share your date idea",
    });
  };

  return (
    <div className="date-card group animate-fade-in">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-lavender-900 mb-2">{idea.idea}</h3>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleShare}
            className="h-8 w-8 text-lavender-500 hover:text-lavender-600 hover:bg-lavender-100"
          >
            <Share className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onDelete(idea.id)}
            className="h-8 w-8 text-romantic-400 hover:text-romantic-500 hover:bg-romantic-100"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {(idea.date || idea.time || idea.location) && (
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          {idea.date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-lavender-500" />
              <span>{format(idea.date, 'PPP')}</span>
            </div>
          )}
          
          {idea.time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-lavender-500" />
              <span>{idea.time}</span>
            </div>
          )}
          
          {idea.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lavender-500" />
              <span>{idea.location}</span>
            </div>
          )}
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-romantic-300 to-lavender-300 rounded-l-xl"></div>
    </div>
  );
};

export default DateCard;
