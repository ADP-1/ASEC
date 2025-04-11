
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface PasswordBreachCheckerProps {
  password: string;
}

const PasswordBreachChecker: React.FC<PasswordBreachCheckerProps> = ({ password }) => {
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<'safe' | 'breached' | null>(null);
  const [customPassword, setCustomPassword] = useState('');

  const simulateBreachCheck = (passwordToCheck: string) => {
    // In a real application, this would call a secure API that uses k-anonymity
    // to check if the password has been breached without revealing the full password
    // For this demo, we'll just use a simple simulation
    setIsChecking(true);
    
    setTimeout(() => {
      // Simple simulation - passwords with less than 8 chars or common ones are "breached"
      const commonPasswords = [
        'password', '123456', 'qwerty', 'admin', 'welcome',
        'password123', '12345678', 'abc123', 'football', 'monkey'
      ];
      
      const isBreached = passwordToCheck.length < 8 || 
        commonPasswords.some(p => passwordToCheck.toLowerCase().includes(p));
      
      setResult(isBreached ? 'breached' : 'safe');
      setIsChecking(false);
      
      toast({
        title: isBreached ? "Password Found in Breaches" : "Password Not Found in Breaches",
        description: isBreached 
          ? "This password appears in known data breaches. You should not use it." 
          : "This password was not found in known breach databases.",
        duration: 3000,
      });
    }, 1500);
  };

  const handleCheck = () => {
    if (customPassword) {
      simulateBreachCheck(customPassword);
    } else if (password) {
      simulateBreachCheck(password);
    }
  };

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <h3 className="text-white font-medium mb-4 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-red-400" />
          Breach Checker
        </h3>
        
        <p className="text-white/60 text-sm mb-4">
          Check if your password has been exposed in known data breaches. This simulates using services like "Have I Been Pwned" without sending your full password.
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter a password to check"
              type="password"
              value={customPassword}
              onChange={(e) => setCustomPassword(e.target.value)}
              className="bg-zinc-800/50 border-white/10 flex-1"
            />
            <Button 
              onClick={handleCheck}
              disabled={isChecking || (!customPassword && !password)}
              className="bg-purple hover:bg-purple-light"
            >
              {isChecking ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⟳</span> 
                  Checking
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="h-4 w-4 mr-2" /> 
                  Check
                </span>
              )}
            </Button>
          </div>
          
          {result && (
            <div className={`flex items-center p-3 rounded-md ${result === 'safe' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {result === 'safe' ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Good news! This password was not found in known breach databases.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Warning! This password appears in known data breaches.</span>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordBreachChecker;
