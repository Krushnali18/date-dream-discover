
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface DateFormProps {
  onAddIdea: (idea: DateIdea) => void;
}

export interface DateIdea {
  id: string;
  idea: string;
  date?: Date;
  time?: string;
  location?: string;
}

const DateForm: React.FC<DateFormProps> = ({ onAddIdea }) => {
  const [dateIdea, setDateIdea] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dateIdea.trim()) {
      toast({
        title: "Oops!",
        description: "Please enter a date idea first",
        variant: "destructive",
      });
      return;
    }

    const newIdea: DateIdea = {
      id: Date.now().toString(),
      idea: dateIdea,
      ...(date && { date }),
      ...(time && { time }),
      ...(location && { location }),
    };

    onAddIdea(newIdea);
    
    // Reset form
    setDateIdea('');
    setDate(undefined);
    setTime('');
    setLocation('');

    toast({
      title: "Date idea added!",
      description: "Your romantic plan has been saved",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-md p-5 border border-lavender-100">
      <div className="space-y-2">
        <Label htmlFor="dateIdea">What's your date idea?</Label>
        <Input 
          id="dateIdea" 
          value={dateIdea} 
          onChange={(e) => setDateIdea(e.target.value)} 
          placeholder="Sunset picnic in the park..."
          className="border-lavender-200 focus-visible:ring-lavender-300"
        />
      </div>
      
      <div className="flex items-center justify-center">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => setShowOptionalFields(!showOptionalFields)}
          className="text-lavender-500 hover:text-lavender-600 hover:bg-lavender-100"
        >
          {showOptionalFields ? 'Hide details' : 'Add more details'} 
        </Button>
      </div>

      {showOptionalFields && (
        <div className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-lavender-500" />
              When?
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-lavender-200",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-lavender-500" />
              What time?
            </Label>
            <Input 
              id="time" 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="border-lavender-200 focus-visible:ring-lavender-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-lavender-500" />
              Where?
            </Label>
            <Input 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Central Park"
              className="border-lavender-200 focus-visible:ring-lavender-300"
            />
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" className="w-full bg-romantic-400 hover:bg-romantic-500">
          Add to Bucket List
        </Button>
      </div>
    </form>
  );
};

export default DateForm;
