
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthAnalyzerProps {
  password: string;
}

interface StrengthAssessment {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

const PasswordStrengthAnalyzer: React.FC<PasswordStrengthAnalyzerProps> = ({ password }) => {
  const [analysis, setAnalysis] = React.useState<StrengthAssessment>({
    score: 0,
    label: 'No Password',
    color: 'bg-zinc-600',
    feedback: ['Please enter a password to analyze'],
  });

  React.useEffect(() => {
    if (!password) {
      setAnalysis({
        score: 0,
        label: 'No Password',
        color: 'bg-zinc-600',
        feedback: ['Please enter a password to analyze'],
      });
      return;
    }

    // Perform password strength analysis
    const strength = analyzePassword(password);
    setAnalysis(strength);
  }, [password]);

  // Password analysis function
  const analyzePassword = (pass: string): StrengthAssessment => {
    const assessment: StrengthAssessment = {
      score: 0,
      label: 'Very Weak',
      color: 'bg-red-500',
      feedback: [],
    };

    // Check length
    if (pass.length < 6) {
      assessment.feedback.push('Password is too short (minimum 6 characters)');
    } else if (pass.length >= 12) {
      assessment.score += 25;
      assessment.feedback.push('Good password length');
    } else {
      assessment.score += Math.min(20, pass.length * 2);
    }

    // Check character variety
    const hasLowercase = /[a-z]/.test(pass);
    const hasUppercase = /[A-Z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);

    if (hasLowercase) assessment.score += 10;
    if (hasUppercase) assessment.score += 15;
    if (hasNumbers) assessment.score += 10;
    if (hasSpecial) assessment.score += 15;

    // Check variety
    let varietyCount = 0;
    if (hasLowercase) varietyCount++;
    if (hasUppercase) varietyCount++;
    if (hasNumbers) varietyCount++;
    if (hasSpecial) varietyCount++;

    if (varietyCount === 1) {
      assessment.feedback.push('Password uses only one character type');
    } else if (varietyCount === 2) {
      assessment.feedback.push('Password uses two character types');
    } else if (varietyCount === 3) {
      assessment.feedback.push('Good variety of character types');
    } else if (varietyCount === 4) {
      assessment.feedback.push('Excellent variety of character types');
    }

    // Check for common patterns
    const commonPatterns = ['123', 'abc', 'qwerty', 'password', 'admin', '987'];
    const hasCommonPattern = commonPatterns.some(pattern => 
      pass.toLowerCase().includes(pattern));
    
    if (hasCommonPattern) {
      assessment.score -= 20;
      assessment.feedback.push('Contains common password patterns');
    }

    // Check for repeated characters
    const hasRepeatedChars = /(.)(\1{2,})/g.test(pass);
    if (hasRepeatedChars) {
      assessment.score -= 15;
      assessment.feedback.push('Contains repeated character sequences');
    }

    // Cap the score
    assessment.score = Math.max(0, Math.min(100, assessment.score));

    // Determine label and color based on score
    if (assessment.score < 20) {
      assessment.label = 'Very Weak';
      assessment.color = 'bg-red-500';
    } else if (assessment.score < 40) {
      assessment.label = 'Weak';
      assessment.color = 'bg-orange-500';
    } else if (assessment.score < 60) {
      assessment.label = 'Fair';
      assessment.color = 'bg-yellow-500';
    } else if (assessment.score < 80) {
      assessment.label = 'Good';
      assessment.color = 'bg-green-500';
    } else {
      assessment.label = 'Excellent';
      assessment.color = 'bg-emerald-500';
    }

    // If no specific feedback was generated, add a general one
    if (assessment.feedback.length === 0) {
      if (assessment.score >= 80) {
        assessment.feedback.push('Strong password with good complexity');
      } else if (assessment.score >= 60) {
        assessment.feedback.push('Decent password but could be improved');
      } else {
        assessment.feedback.push('Consider using a more complex password');
      }
    }

    return assessment;
  };

  return (
    <Card className="glass">
      <CardContent className="p-6">
        <h3 className="text-white font-medium mb-4 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          Password Strength Analysis
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-white/70">Strength Score</span>
              <span className={`font-medium ${analysis.score >= 60 ? 'text-green-400' : analysis.score >= 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                {analysis.label}
              </span>
            </div>
            
            <Progress value={analysis.score} className="h-2 bg-zinc-700">
              <div className={`h-full ${analysis.color}`} style={{ width: `${analysis.score}%` }}></div>
            </Progress>
          </div>
          
          <div className="bg-zinc-800/50 rounded-md p-3 text-white/70">
            <div className="flex items-start mb-2">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400 mt-0.5 flex-shrink-0" />
              <h4 className="font-medium">Analysis & Recommendations</h4>
            </div>
            <ul className="space-y-1 ml-6 text-sm list-disc">
              {analysis.feedback.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordStrengthAnalyzer;
