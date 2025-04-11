
import React from 'react';
import PasswordBreachChecker from './PasswordBreachChecker';
import PasswordStrengthAnalyzer from './PasswordStrengthAnalyzer';
import PasswordSuggestion from './PasswordSuggestion';
import { PasswordOptions } from '@/utils/passwordUtils';

interface PasswordCheckerProps {
  password: string;
  options: PasswordOptions;
  onSelectSuggestion: (password: string) => void;
}

const PasswordChecker: React.FC<PasswordCheckerProps> = ({ password, options, onSelectSuggestion }) => {
  return (
    <div className="space-y-6">
      <PasswordStrengthAnalyzer password={password} />
      <PasswordBreachChecker password={password} />
      <PasswordSuggestion 
        basedOnPassword={password} 
        options={options} 
        onSelectPassword={onSelectSuggestion} 
      />
    </div>
  );
};

export default PasswordChecker;
