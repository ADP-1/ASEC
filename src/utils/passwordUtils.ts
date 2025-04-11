
export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export type PasswordCategory = 'personal' | 'financial' | 'work' | 'other';

export interface GeneratedPassword {
  password: string;
  category: PasswordCategory;
  strength: number; // 0-100
  timestamp: number; // Date.now()
  expiresAt: number; // Date.now() + expiry time in ms
  id: string;
}

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Generate a random password based on the provided options
export const generatePassword = (options: PasswordOptions): string => {
  let charset = '';
  if (options.includeUppercase) charset += uppercaseChars;
  if (options.includeLowercase) charset += lowercaseChars;
  if (options.includeNumbers) charset += numberChars;
  if (options.includeSymbols) charset += symbolChars;

  // Fallback to ensure we have something to work with
  if (charset === '') charset = lowercaseChars + numberChars;

  let password = '';
  const charsetLength = charset.length;

  // Generate the password
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charsetLength);
    password += charset[randomIndex];
  }

  return password;
};

// Calculate password strength on a scale of 0-100
export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;

  let strength = 0;
  const length = password.length;

  // Length contribution (up to 30 points)
  strength += Math.min(30, length * 2);

  // Character variety contribution
  if (/[A-Z]/.test(password)) strength += 15; // Uppercase
  if (/[a-z]/.test(password)) strength += 15; // Lowercase
  if (/[0-9]/.test(password)) strength += 15; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) strength += 15; // Symbols

  // Reduce score for common patterns
  if (/(.)\1{2,}/.test(password)) strength -= 15; // Repeated characters
  if (/^[A-Za-z]+\d+$/.test(password)) strength -= 10; // Simple combination of letters followed by numbers
  if (/^[A-Z][a-z]+\d+$/.test(password)) strength -= 10; // Common pattern of capitalized word followed by numbers

  // Final adjustment
  strength = Math.max(0, Math.min(100, strength));
  return strength;
};

// Get a descriptive label and color for a password strength value
export const getStrengthInfo = (strength: number): { label: string; color: string } => {
  if (strength < 30) {
    return { label: 'Very Weak', color: 'text-red-500' };
  } else if (strength < 50) {
    return { label: 'Weak', color: 'text-orange-500' };
  } else if (strength < 70) {
    return { label: 'Moderate', color: 'text-yellow-500' };
  } else if (strength < 90) {
    return { label: 'Strong', color: 'text-green-500' };
  } else {
    return { label: 'Very Strong', color: 'text-emerald-500' };
  }
};

// Format the time remaining until a password expires
export const formatTimeRemaining = (expiresAt: number): string => {
  const timeRemaining = expiresAt - Date.now();
  if (timeRemaining <= 0) return 'Expired';

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};
