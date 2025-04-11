
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Clock, 
  Heart,
  Star,
  Share2,
  BarChart2, 
  Folder,
  History,
  Shield,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useToast } from '../hooks/use-toast';
import PasswordChecker from './PasswordChecker';
import { 
  PasswordOptions, 
  PasswordCategory, 
  GeneratedPassword,
  generatePassword, 
  calculatePasswordStrength, 
  getStrengthInfo,
  formatTimeRemaining
} from '../utils/passwordUtils';

const PasswordGenerator: React.FC = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });
  
  const [category, setCategory] = useState<PasswordCategory>('personal');
  const [currentPassword, setCurrentPassword] = useState<GeneratedPassword | null>(null);
  const [passwordHistory, setPasswordHistory] = useState<GeneratedPassword[]>([]);
  const [favoritePasswords, setFavoritePasswords] = useState<GeneratedPassword[]>([]);
  const [copied, setCopied] = useState(false);
  const [tabValue, setTabValue] = useState("generator");
  const [remainingTime, setRemainingTime] = useState('');

  // Generate a password when component mounts or options change
  useEffect(() => {
    if (!currentPassword) {
      handleGeneratePassword();
    }
  }, []);

  // Update the password expiration timer
  useEffect(() => {
    if (!currentPassword) return;

    const intervalId = setInterval(() => {
      const timeString = formatTimeRemaining(currentPassword.expiresAt);
      setRemainingTime(timeString);
      
      if (currentPassword.expiresAt <= Date.now()) {
        clearInterval(intervalId);
        setRemainingTime('Expired');
      }
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [currentPassword]);

  const handleGeneratePassword = () => {
    const generatedText = generatePassword(options);
    const strength = calculatePasswordStrength(generatedText);
    
    // Set expiry time (30 days from now)
    const expiryTimeMs = 30 * 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + expiryTimeMs;
    
    const newPassword: GeneratedPassword = {
      password: generatedText,
      category,
      strength,
      timestamp: Date.now(),
      expiresAt,
      id: crypto.randomUUID(),
    };
    
    setCurrentPassword(newPassword);
    setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)]);
  };

  const handleCopyPassword = () => {
    if (!currentPassword) return;
    
    navigator.clipboard.writeText(currentPassword.password);
    setCopied(true);
    
    toast({
      title: "Password Copied",
      description: "Password has been copied to clipboard",
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (!currentPassword) return;
    
    const isFavorite = favoritePasswords.some(p => p.id === currentPassword.id);
    
    if (isFavorite) {
      setFavoritePasswords(prev => prev.filter(p => p.id !== currentPassword.id));
      toast({
        title: "Removed from favorites",
        description: "Password has been removed from favorites",
        duration: 2000,
      });
    } else {
      setFavoritePasswords(prev => [currentPassword, ...prev]);
      toast({
        title: "Added to favorites",
        description: "Password has been added to favorites",
        duration: 2000,
      });
    }
  };

  const handleSharePassword = () => {
    if (!currentPassword) return;
    
    // In a real app, this would be handled securely
    // For this demo, we'll just copy a shareable version to clipboard
    const shareText = `ASEC++ Generated Password: ${currentPassword.password} (Valid until ${new Date(currentPassword.expiresAt).toLocaleString()})`;
    
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Share link copied",
      description: "Password share link has been copied to clipboard",
      duration: 2000,
    });
  };

  const handleSelectSuggestion = (password: string) => {
    // Create a new password object with the suggested password
    const strength = calculatePasswordStrength(password);
    
    // Set expiry time (30 days from now)
    const expiryTimeMs = 30 * 24 * 60 * 60 * 1000;
    const expiresAt = Date.now() + expiryTimeMs;
    
    const newPassword: GeneratedPassword = {
      password,
      category,
      strength,
      timestamp: Date.now(),
      expiresAt,
      id: crypto.randomUUID(),
    };
    
    setCurrentPassword(newPassword);
    setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)]);
  };

  const strengthInfo = useMemo(() => {
    if (!currentPassword) return { label: 'N/A', color: 'text-gray-400' };
    return getStrengthInfo(currentPassword.strength);
  }, [currentPassword]);

  const isFavorite = useMemo(() => {
    if (!currentPassword) return false;
    return favoritePasswords.some(p => p.id === currentPassword.id);
  }, [currentPassword, favoritePasswords]);

  return (
    <section id="password-generator" className="min-h-screen pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient mb-2">
            Secure Password Generator
          </h2>
          <p className="text-white/60 max-w-lg mx-auto">
            Generate strong, secure passwords, categorize them, track expiry, and access your password history.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="generator" value={tabValue} onValueChange={setTabValue} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="generator" className="text-xs md:text-sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Generator</span>
              </TabsTrigger>
              <TabsTrigger value="checker" className="text-xs md:text-sm">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Checker</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="text-xs md:text-sm">
                <Star className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Favorites</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs md:text-sm">
                <History className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs md:text-sm">
                <Folder className="h-4 w-4 mr-2" />
                <span className="hidden xs:inline">Categories</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Generator Tab */}
            <TabsContent value="generator" className="space-y-6">
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Folder className="h-4 w-4 text-white/60 mr-2" />
                        <span className="text-white/60 text-sm">Category:</span>
                      </div>
                      <span className="text-white font-medium capitalize">{category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-white/60 mr-2" />
                        <span className="text-white/60 text-sm">Expires in:</span>
                      </div>
                      <span className="text-white font-medium">{remainingTime}</span>
                    </div>
                  </div>
                  
                  <div className="relative py-4 mb-6">
                    <div className="flex items-center justify-between bg-zinc-800/80 rounded-md p-4">
                      <span className="text-white text-lg font-mono tracking-wider">
                        {currentPassword?.password || "Generating..."}
                      </span>
                      <div className="flex">
                        <Button
                          size="icon"
                          variant="ghost" 
                          onClick={handleCopyPassword}
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <Button 
                      onClick={handleGeneratePassword} 
                      className="bg-purple text-white hover:bg-purple-light flex-1"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate New Password
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={handleToggleFavorite}
                        className={`border-white/10 ${isFavorite ? 'text-purple bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleSharePassword}
                        className="border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart2 className="h-5 w-5 text-white/60 mr-2" />
                      <h3 className="text-white font-medium">Password Strength</h3>
                    </div>
                    <span className={`font-medium ${strengthInfo.color}`}>{strengthInfo.label}</span>
                  </div>
                  
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${currentPassword?.strength || 0}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white font-medium">Password Length: {options.length}</label>
                      </div>
                      <Slider
                        value={[options.length]}
                        min={8}
                        max={32}
                        step={1}
                        onValueChange={(value) => setOptions({ ...options, length: value[0] })}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="uppercase" 
                          checked={options.includeUppercase}
                          onCheckedChange={(checked) => setOptions({ ...options, includeUppercase: checked })}
                        />
                        <Label htmlFor="uppercase">Include Uppercase</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="lowercase" 
                          checked={options.includeLowercase}
                          onCheckedChange={(checked) => setOptions({ ...options, includeLowercase: checked })}
                        />
                        <Label htmlFor="lowercase">Include Lowercase</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="numbers" 
                          checked={options.includeNumbers}
                          onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
                        />
                        <Label htmlFor="numbers">Include Numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="symbols" 
                          checked={options.includeSymbols}
                          onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
                        />
                        <Label htmlFor="symbols">Include Symbols</Label>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-white font-medium mb-2">Password Category</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {(['personal', 'financial', 'work', 'other'] as PasswordCategory[]).map((cat) => (
                          <Button
                            key={cat}
                            variant={cat === category ? "default" : "outline"}
                            className={cat === category 
                              ? "bg-purple hover:bg-purple-light text-white" 
                              : "bg-zinc-800/30 border-white/10 text-white/70 hover:bg-white/10"
                            }
                            onClick={() => setCategory(cat)}
                          >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Checker Tab */}
            <TabsContent value="checker" className="space-y-6">
              {currentPassword ? (
                <PasswordChecker 
                  password={currentPassword.password} 
                  options={options}
                  onSelectSuggestion={handleSelectSuggestion}
                />
              ) : (
                <Card className="glass">
                  <CardContent className="p-6 text-center">
                    <AlertCircle className="h-12 w-12 text-white/20 mx-auto mb-2" />
                    <h3 className="text-white font-medium mb-2">No Password Generated</h3>
                    <p className="text-white/60">
                      Generate a password first to use the password checker tools.
                    </p>
                    <Button
                      onClick={() => setTabValue("generator")}
                      className="mt-4 bg-purple hover:bg-purple-light"
                    >
                      Go to Generator
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Favorites Tab */}
            <TabsContent value="favorites">
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-4">Favorite Passwords</h3>
                  
                  {favoritePasswords.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-white/20 mx-auto mb-2" />
                      <p className="text-white/60">No favorite passwords yet.</p>
                      <p className="text-white/40 text-sm">Generate a password and click the heart icon to add it.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favoritePasswords.map((favPassword) => (
                        <div 
                          key={favPassword.id} 
                          className="flex items-center justify-between bg-zinc-800/50 rounded-md p-3"
                        >
                          <div>
                            <div className="flex items-center">
                              <span className="text-white font-mono">{favPassword.password}</span>
                            </div>
                            <div className="flex items-center mt-1 gap-4">
                              <span className={`text-xs ${getStrengthInfo(favPassword.strength).color}`}>
                                {getStrengthInfo(favPassword.strength).label}
                              </span>
                              <span className="text-xs text-white/40 capitalize">{favPassword.category}</span>
                              <span className="text-xs text-white/40">
                                Expires: {formatTimeRemaining(favPassword.expiresAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm" 
                              variant="ghost" 
                              onClick={() => {
                                navigator.clipboard.writeText(favPassword.password);
                                toast({
                                  title: "Password Copied",
                                  description: "Password has been copied to clipboard",
                                  duration: 2000,
                                });
                              }}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setFavoritePasswords(prev => prev.filter(p => p.id !== favPassword.id));
                                toast({
                                  title: "Removed from favorites",
                                  description: "Password has been removed from favorites",
                                  duration: 2000,
                                });
                              }}
                              className="text-white/60 hover:text-red-400 hover:bg-white/10"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setCurrentPassword(favPassword);
                                setTabValue("generator");
                              }}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* History Tab */}
            <TabsContent value="history">
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-4">Password History</h3>
                  
                  {passwordHistory.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-white/20 mx-auto mb-2" />
                      <p className="text-white/60">No password history yet.</p>
                      <p className="text-white/40 text-sm">Generate passwords to see them appear here.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {passwordHistory.map((historyPassword) => (
                        <div 
                          key={historyPassword.id} 
                          className="flex items-center justify-between bg-zinc-800/50 rounded-md p-3"
                        >
                          <div>
                            <div className="flex items-center">
                              <span className="text-white font-mono">{historyPassword.password}</span>
                            </div>
                            <div className="flex items-center mt-1 gap-4">
                              <span className={`text-xs ${getStrengthInfo(historyPassword.strength).color}`}>
                                {getStrengthInfo(historyPassword.strength).label}
                              </span>
                              <span className="text-xs text-white/40 capitalize">{historyPassword.category}</span>
                              <span className="text-xs text-white/40">
                                Generated: {new Date(historyPassword.timestamp).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm" 
                              variant="ghost" 
                              onClick={() => {
                                navigator.clipboard.writeText(historyPassword.password);
                                toast({
                                  title: "Password Copied",
                                  description: "Password has been copied to clipboard",
                                  duration: 2000,
                                });
                              }}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setCurrentPassword(historyPassword);
                                setTabValue("generator");
                              }}
                              className="text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="settings">
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-6">Password Categories</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-zinc-800/50 border border-white/10 rounded-md p-4">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          Personal
                        </h4>
                        <p className="text-white/60 text-sm">
                          Passwords for personal accounts, including social media, email, and personal websites.
                        </p>
                      </div>
                      <div className="bg-zinc-800/50 border border-white/10 rounded-md p-4">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          Financial
                        </h4>
                        <p className="text-white/60 text-sm">
                          Passwords for banking, payment providers, cryptocurrency wallets, and other financial services.
                        </p>
                      </div>
                      <div className="bg-zinc-800/50 border border-white/10 rounded-md p-4">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
                          Work
                        </h4>
                        <p className="text-white/60 text-sm">
                          Passwords for work-related accounts, including email, team collaboration tools, and CRM systems.
                        </p>
                      </div>
                      <div className="bg-zinc-800/50 border border-white/10 rounded-md p-4">
                        <h4 className="text-white font-medium mb-2 flex items-center">
                          <span className="w-3 h-3 rounded-full bg-purple mr-2"></span>
                          Other
                        </h4>
                        <p className="text-white/60 text-sm">
                          Passwords that don't fit into the other categories or are temporary in nature.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple/20 to-transparent p-4 rounded-md border border-white/10">
                      <h4 className="text-white font-medium mb-2">Password Tips</h4>
                      <ul className="text-white/60 text-sm space-y-1">
                        <li>• Use different passwords for different accounts</li>
                        <li>• Regularly update your passwords (every 30-90 days)</li>
                        <li>• Longer passwords are stronger than complex shorter ones</li>
                        <li>• Use a mix of character types (uppercase, lowercase, numbers, symbols)</li>
                        <li>• Avoid using easily guessable information (names, birthdates)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </section>
  );
};

export default PasswordGenerator;
