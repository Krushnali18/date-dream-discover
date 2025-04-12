
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LocationSuggestionsProps {
  onSuggestionSelect: (idea: string, location: string) => void;
}

// Sample date ideas based on location types
const locationIdeas = {
  urban: [
    { idea: "Rooftop dinner with city views", location: "Downtown" },
    { idea: "Art gallery exploration", location: "Art District" },
    { idea: "Try a new coffee shop", location: "City Center" },
    { idea: "Food truck festival", location: "Urban Park" },
    { idea: "Historical city walking tour", location: "Old Town" }
  ],
  nature: [
    { idea: "Stargazing picnic", location: "Local Park" },
    { idea: "Scenic hike and picnic", location: "Nature Trail" },
    { idea: "Kayaking adventure", location: "Nearby Lake" },
    { idea: "Flower picking at a garden", location: "Botanical Garden" },
    { idea: "Sunset watching", location: "Lookout Point" }
  ],
  activity: [
    { idea: "Indoor rock climbing", location: "Climbing Gym" },
    { idea: "Cooking class together", location: "Culinary School" },
    { idea: "Dance lessons", location: "Dance Studio" },
    { idea: "Pottery making workshop", location: "Art Center" },
    { idea: "Escape room challenge", location: "Entertainment Center" }
  ]
};

const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({ onSuggestionSelect }) => {
  const [locationType, setLocationType] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Array<{ idea: string, location: string }>>([]);
  const { toast } = useToast();

  const handleLocationTypeSelect = (type: string) => {
    setLocationType(type);
    
    // Get random suggestions based on type
    const ideas = locationIdeas[type as keyof typeof locationIdeas];
    const randomized = [...ideas].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSuggestions(randomized);
    
    toast({
      title: "Suggestions ready!",
      description: `Here are some ${type} date ideas to inspire you`,
    });
  };

  const handleSuggestionSelect = (idea: string, location: string) => {
    onSuggestionSelect(idea, location);
    setSuggestions([]);
    setLocationType(null);
    
    toast({
      title: "Great choice!",
      description: "We've added this idea to your form",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-lavender-100">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-lavender-500" />
        <h2 className="text-lg font-semibold text-lavender-700">Need inspiration?</h2>
      </div>
      
      {!locationType ? (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-3">
            Select a location type to get date ideas:
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLocationTypeSelect('urban')}
              className="flex items-center gap-1 border-lavender-200"
            >
              <MapPin className="h-3 w-3" /> Urban
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLocationTypeSelect('nature')}
              className="flex items-center gap-1 border-lavender-200"
            >
              <MapPin className="h-3 w-3" /> Nature
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleLocationTypeSelect('activity')}
              className="flex items-center gap-1 border-lavender-200"
            >
              <MapPin className="h-3 w-3" /> Activity
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Suggested {locationType} dates:</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setLocationType(null)}
              className="text-xs h-7 px-2 text-lavender-500 hover:text-lavender-600"
            >
              Back
            </Button>
          </div>
          
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => handleSuggestionSelect(suggestion.idea, suggestion.location)}
                className="block w-full text-left justify-start h-auto py-2 px-3 hover:bg-lavender-100"
              >
                <div>
                  <p className="font-medium text-lavender-700">{suggestion.idea}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {suggestion.location}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSuggestions;
