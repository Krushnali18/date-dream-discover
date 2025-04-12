
import React, { useState, useEffect } from 'react';
import DateHeader from '@/components/DateHeader';
import DateForm, { DateIdea } from '@/components/DateForm';
import DateList from '@/components/DateList';
import LocationSuggestions from '@/components/LocationSuggestions';
import { useToast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

const Index = () => {
  const [dateIdeas, setDateIdeas] = useState<DateIdea[]>([]);
  const { toast } = useToast();

  // Reset on page refresh
  useEffect(() => {
    // This will only run once when the component mounts
    setDateIdeas([]);
  }, []);

  const addDateIdea = (idea: DateIdea) => {
    setDateIdeas(prev => [idea, ...prev]);
  };

  const deleteDateIdea = (id: string) => {
    setDateIdeas(prev => prev.filter(idea => idea.id !== id));
    toast({
      title: "Date idea removed",
      description: "The date idea has been removed from your list",
    });
  };

  const handleSuggestionSelect = (idea: string, location: string) => {
    const newIdea: DateIdea = {
      id: Date.now().toString(),
      idea: idea,
      location: location
    };
    
    addDateIdea(newIdea);
  };

  return (
    <div className="min-h-screen bg-secondary py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <DateHeader />
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <DateForm onAddIdea={addDateIdea} />
            <DateList ideas={dateIdeas} onDeleteIdea={deleteDateIdea} />
          </div>
          
          <div className="space-y-6">
            <LocationSuggestions onSuggestionSelect={handleSuggestionSelect} />
            
            <div className="bg-white rounded-xl shadow-md p-5 border border-lavender-100">
              <div className="flex items-center justify-center gap-2 pb-4 border-b border-lavender-100">
                <Heart className="h-5 w-5 text-romantic-400" />
                <h2 className="text-lg font-semibold text-lavender-700">About</h2>
              </div>
              <div className="pt-4 text-sm text-muted-foreground space-y-3">
                <p>
                  Date Bucket List helps you plan and organize your romantic ideas.
                </p>
                <p>
                  Add your date ideas with optional details, get inspired with our suggestions, and easily share your plans via WhatsApp.
                </p>
                <p>
                  Your list refreshes on page reload to keep your ideas fresh!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Date Bucket List &copy; {new Date().getFullYear()} - Create and share your romantic adventures</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
