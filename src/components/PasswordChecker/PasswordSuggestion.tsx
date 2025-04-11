
import React from 'react';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generatePassword, PasswordOptions } from '@/utils/passwordUtils';

interface PasswordSuggestionProps {
  basedOnPassword: string;
  options: PasswordOptions;
  onSelectPassword: (password: string) => void;
}

const PasswordSuggestion: React.FC<PasswordSuggestionProps> = ({ 
  basedOnPassword, 
  options, 
  onSelectPassword 
}) => {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = React.useState<string[]>([]);

  // Generate new password suggestions
  const generateSuggestions = () => {
    // Use the same options but slightly modify them to create variations
    const newSuggestions = Array.from({ length: 4 }, () => {
      // Create a copy of the options to avoid mutations
      const modifiedOptions = { ...options };
      
      // Ensure some minimum complexity
      modifiedOptions.includeUppercase = true;
      modifiedOptions.includeLowercase = true;
      modifiedOptions.includeNumbers = Math.random() > 0.2; // 80% chance to include numbers
      modifiedOptions.includeSymbols = Math.random() > 0.5; // 50% chance to include symbols
      
      // Vary the length slightly
      const lengthVariation = Math.floor(Math.random() * 5) - 2; // -2 to +2
      modifiedOptions.length = Math.max(8, (options.length || 12) + lengthVariation);
      
      return generatePassword(modifiedOptions);
    });
    
    setSuggestions(newSuggestions);
  };

  // Generate suggestions on mount and when base password changes
  React.useEffect(() => {
    generateSuggestions();
  }, [basedOnPassword]);

  // Handle copying a suggested password
  const handleCopy = (suggestion: string) => {
    navigator.clipboard.writeText(suggestion);
    
    toast({
      title: "Password Copied",
      description: "Suggestion has been copied to clipboard",
      duration: 2000,
    });
  };

  // Handle using a suggested password
  const handleUse = (suggestion: string) => {
    onSelectPassword(suggestion);
    
    toast({
      title: "Password Selected",
      description: "Suggestion has been set as your current password",
      duration: 2000,
    });
  };

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-amber-400" />
            Strong Password Suggestions
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={generateSuggestions}
            className="bg-zinc-800/30 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Refresh
          </Button>
        </div>
        
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index} 
              className="bg-zinc-800/50 rounded-md p-3 flex items-center justify-between"
            >
              <code className="text-sm font-mono text-white">{suggestion}</code>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleCopy(suggestion)} 
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleUse(suggestion)}
                  className="bg-purple hover:bg-purple-light"
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordSuggestion;
