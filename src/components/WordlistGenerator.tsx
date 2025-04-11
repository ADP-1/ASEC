
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Copy, 
  Check,
  Download,
  Info,
  Hash,
  List,
  SlidersHorizontal,
  ToggleLeft,
  ToggleRight,
  KeySquare
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { useToast } from '../hooks/use-toast';
import { 
  HumanTarget, 
  OrganizationTarget, 
  TargetType,
  GenerationOptions,
  generateHumanWordlist,
  generateOrganizationWordlist
} from '../utils/wordlistUtils';

const WordlistGenerator: React.FC = () => {
  const { toast } = useToast();
  const [targetType, setTargetType] = useState<TargetType>('human');
  const [humanTarget, setHumanTarget] = useState<HumanTarget>({});
  const [organizationTarget, setOrganizationTarget] = useState<OrganizationTarget>({});
  const [generatedWordlist, setGeneratedWordlist] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    minLength: 6,
    maxLength: 12,
    count: 1000,
    generatePINs: false
  });
  
  const handleGenerateWordlist = () => {
    let wordlist: string[] = [];
    
    if (targetType === 'human') {
      wordlist = generateHumanWordlist(humanTarget, generationOptions);
    } else {
      wordlist = generateOrganizationWordlist(organizationTarget, generationOptions);
    }
    
    setGeneratedWordlist(wordlist);
    
    toast({
      title: "Wordlist Generated",
      description: `Generated ${wordlist.length} possible ${generationOptions.generatePINs ? 'PINs' : 'passwords'}`,
      duration: 3000,
    });
  };
  
  const handleCopyWordlist = () => {
    const text = generatedWordlist.join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    
    toast({
      title: "Wordlist Copied",
      description: "Wordlist has been copied to clipboard",
      duration: 2000,
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownloadWordlist = () => {
    const text = generatedWordlist.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wordlist-${targetType}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Wordlist Downloaded",
      description: "Wordlist file has been downloaded",
      duration: 2000,
    });
  };
  
  const handleUpdateHumanTarget = (field: keyof HumanTarget, value: string) => {
    setHumanTarget(prev => ({ ...prev, [field]: value }));
  };
  
  const handleUpdateOrgTarget = (field: keyof OrganizationTarget, value: string) => {
    setOrganizationTarget(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateGenerationOptions = (field: keyof GenerationOptions, value: any) => {
    setGenerationOptions(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="wordlist-generator" className="min-h-screen pt-12 pb-16 px-4 bg-zinc-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="glass mb-6">
            <CardContent className="p-6">
              <h3 className="text-white font-medium mb-4">Generation Options</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="target-type" className="text-white mb-2 block flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Target Type
                    </Label>
                    <Select 
                      value={targetType} 
                      onValueChange={(value: TargetType) => setTargetType(value)}
                    >
                      <SelectTrigger className="bg-zinc-800/50 border-white/10">
                        <SelectValue placeholder="Select target type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="human">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Human</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="organization">
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 mr-2" />
                            <span>Organization</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white mb-2 block flex items-center">
                      <KeySquare className="h-4 w-4 mr-2" />
                      Password Type
                    </Label>
                    <div className="flex items-center space-x-2 py-2">
                      <Button
                        variant={generationOptions.generatePINs ? "outline" : "default"}
                        className={!generationOptions.generatePINs ? "bg-purple hover:bg-purple-light" : "bg-zinc-800/30 border-white/10"}
                        onClick={() => handleUpdateGenerationOptions('generatePINs', false)}
                      >
                        <Hash className="h-4 w-4 mr-2" />
                        Passwords
                      </Button>
                      <Button
                        variant={generationOptions.generatePINs ? "default" : "outline"}
                        className={generationOptions.generatePINs ? "bg-purple hover:bg-purple-light" : "bg-zinc-800/30 border-white/10"}
                        onClick={() => handleUpdateGenerationOptions('generatePINs', true)}
                      >
                        <KeySquare className="h-4 w-4 mr-2" />
                        PINs
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block flex items-center">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Length Range
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="minLength" className="text-white/70 text-sm">Min Length</Label>
                        <Input 
                          id="minLength"
                          type="number"
                          min={1}
                          max={32}
                          value={generationOptions.minLength}
                          onChange={(e) => handleUpdateGenerationOptions('minLength', parseInt(e.target.value) || 1)}
                          className="bg-zinc-800/50 border-white/10"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxLength" className="text-white/70 text-sm">Max Length</Label>
                        <Input 
                          id="maxLength"
                          type="number"
                          min={1}
                          max={32}
                          value={generationOptions.maxLength}
                          onChange={(e) => handleUpdateGenerationOptions('maxLength', parseInt(e.target.value) || 32)}
                          className="bg-zinc-800/50 border-white/10"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="count" className="text-white mb-2 block flex items-center">
                      <List className="h-4 w-4 mr-2" />
                      Number of Results (max 99,999)
                    </Label>
                    <Input 
                      id="count"
                      type="number"
                      min={1}
                      max={99999}
                      value={generationOptions.count}
                      onChange={(e) => handleUpdateGenerationOptions('count', Math.min(parseInt(e.target.value) || 1, 99999))}
                      className="bg-zinc-800/50 border-white/10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <Card className="glass h-full">
                <CardContent className="p-6">
                  <h3 className="text-white font-medium mb-4">Target Information</h3>
                  
                  <div className="space-y-6">
                    {targetType === 'human' ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName" className="text-white/80 text-sm">Full Name</Label>
                          <Input 
                            id="fullName"
                            placeholder="John Doe"
                            value={humanTarget.fullName || ''}
                            onChange={(e) => handleUpdateHumanTarget('fullName', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="nickname" className="text-white/80 text-sm">Nickname</Label>
                          <Input 
                            id="nickname"
                            placeholder="Johnny"
                            value={humanTarget.nickname || ''}
                            onChange={(e) => handleUpdateHumanTarget('nickname', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="birthDate" className="text-white/80 text-sm">Birth Date</Label>
                          <Input 
                            id="birthDate"
                            placeholder="mm/dd/yyyy"
                            type="date"
                            value={humanTarget.birthDate || ''}
                            onChange={(e) => handleUpdateHumanTarget('birthDate', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="mobileNumber" className="text-white/80 text-sm">Mobile Number</Label>
                          <Input 
                            id="mobileNumber"
                            placeholder="123-456-7890"
                            value={humanTarget.mobileNumber || ''}
                            onChange={(e) => handleUpdateHumanTarget('mobileNumber', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="petName" className="text-white/80 text-sm">Pet Name</Label>
                          <Input 
                            id="petName"
                            placeholder="Fluffy"
                            value={humanTarget.petName || ''}
                            onChange={(e) => handleUpdateHumanTarget('petName', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="spouseName" className="text-white/80 text-sm">Spouse Name</Label>
                          <Input 
                            id="spouseName"
                            placeholder="Jane Doe"
                            value={humanTarget.spouseName || ''}
                            onChange={(e) => handleUpdateHumanTarget('spouseName', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="childrenNames" className="text-white/80 text-sm">Children Names (comma separated)</Label>
                          <Input 
                            id="childrenNames"
                            placeholder="Bob, Alice"
                            value={humanTarget.childrenNames || ''}
                            onChange={(e) => handleUpdateHumanTarget('childrenNames', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="favoriteTeam" className="text-white/80 text-sm">Favorite Team</Label>
                          <Input 
                            id="favoriteTeam"
                            placeholder="Eagles"
                            value={humanTarget.favoriteTeam || ''}
                            onChange={(e) => handleUpdateHumanTarget('favoriteTeam', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="favoriteColor" className="text-white/80 text-sm">Favorite Color</Label>
                          <Input 
                            id="favoriteColor"
                            placeholder="Blue"
                            value={humanTarget.favoriteColor || ''}
                            onChange={(e) => handleUpdateHumanTarget('favoriteColor', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <Label htmlFor="hometown" className="text-white/80 text-sm">Hometown</Label>
                          <Input 
                            id="hometown"
                            placeholder="New York"
                            value={humanTarget.hometown || ''}
                            onChange={(e) => handleUpdateHumanTarget('hometown', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <Label htmlFor="favoriteHobby" className="text-white/80 text-sm">Favorite Hobby</Label>
                          <Input 
                            id="favoriteHobby"
                            placeholder="Fishing"
                            value={humanTarget.favoriteHobby || ''}
                            onChange={(e) => handleUpdateHumanTarget('favoriteHobby', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <Label htmlFor="favoriteMovie" className="text-white/80 text-sm">Favorite Movie</Label>
                          <Input 
                            id="favoriteMovie"
                            placeholder="Star Wars"
                            value={humanTarget.favoriteMovie || ''}
                            onChange={(e) => handleUpdateHumanTarget('favoriteMovie', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>

                        <div>
                          <Label htmlFor="additionalKeywords" className="text-white/80 text-sm flex items-center">
                            Additional Keywords
                            <Info className="h-3 w-3 ml-1 text-white/50" />
                          </Label>
                          <Input 
                            id="additionalKeywords"
                            placeholder="Enter additional keywords (comma separated)"
                            value={humanTarget.additionalKeywords || ''}
                            onChange={(e) => handleUpdateHumanTarget('additionalKeywords', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                          <p className="text-white/50 text-xs mt-1">
                            Add any missing information or other significant words that might be used in passwords
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="organizationName" className="text-white/80 text-sm">Organization Name</Label>
                          <Input 
                            id="organizationName"
                            placeholder="Acme Corporation"
                            value={organizationTarget.organizationName || ''}
                            onChange={(e) => handleUpdateOrgTarget('organizationName', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="abbreviation" className="text-white/80 text-sm">Abbreviation</Label>
                          <Input 
                            id="abbreviation"
                            placeholder="ACME"
                            value={organizationTarget.abbreviation || ''}
                            onChange={(e) => handleUpdateOrgTarget('abbreviation', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="foundingYear" className="text-white/80 text-sm">Founding Year</Label>
                          <Input 
                            id="foundingYear"
                            placeholder="1990"
                            value={organizationTarget.foundingYear || ''}
                            onChange={(e) => handleUpdateOrgTarget('foundingYear', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="domain" className="text-white/80 text-sm">Domain</Label>
                          <Input 
                            id="domain"
                            placeholder="acme.com"
                            value={organizationTarget.domain || ''}
                            onChange={(e) => handleUpdateOrgTarget('domain', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="location" className="text-white/80 text-sm">Location (comma separated)</Label>
                          <Input 
                            id="location"
                            placeholder="New York, London"
                            value={organizationTarget.location || ''}
                            onChange={(e) => handleUpdateOrgTarget('location', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="industry" className="text-white/80 text-sm">Industry</Label>
                          <Input 
                            id="industry"
                            placeholder="Technology"
                            value={organizationTarget.industry || ''}
                            onChange={(e) => handleUpdateOrgTarget('industry', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="products" className="text-white/80 text-sm">Products (comma separated)</Label>
                          <Input 
                            id="products"
                            placeholder="Widget, Gadget"
                            value={organizationTarget.products || ''}
                            onChange={(e) => handleUpdateOrgTarget('products', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="slogan" className="text-white/80 text-sm">Slogan</Label>
                          <Input 
                            id="slogan"
                            placeholder="Innovation for everyone"
                            value={organizationTarget.slogan || ''}
                            onChange={(e) => handleUpdateOrgTarget('slogan', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="ceoName" className="text-white/80 text-sm">CEO Name</Label>
                          <Input 
                            id="ceoName"
                            placeholder="John Smith"
                            value={organizationTarget.ceoName || ''}
                            onChange={(e) => handleUpdateOrgTarget('ceoName', e.target.value)}
                            className="bg-zinc-800/50 border-white/10"
                          />
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleGenerateWordlist}
                      className="w-full bg-purple hover:bg-purple-light"
                    >
                      Generate Wordlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card className="glass h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Generated Wordlist</h3>
                    
                    <div className="flex gap-2">
                      <Button
                        disabled={generatedWordlist.length === 0}
                        variant="outline"
                        size="sm"
                        onClick={handleCopyWordlist}
                        className="bg-zinc-800/50 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                        Copy
                      </Button>
                      
                      <Button
                        disabled={generatedWordlist.length === 0}
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadWordlist}
                        className="bg-zinc-800/50 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-zinc-800/50 rounded-md border border-white/10 h-[500px] overflow-auto p-4">
                    {generatedWordlist.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-white/40 text-center">
                        <div>
                          <p>No wordlist generated yet.</p>
                          <p className="text-sm mt-2">
                            Fill in target details and click "Generate Wordlist" to create a list of potential {generationOptions.generatePINs ? 'PINs' : 'passwords'}.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white/60 mb-4">
                          Generated {generatedWordlist.length} possible {generationOptions.generatePINs ? 'PINs' : 'words'} for this {targetType}.
                        </p>
                        <Textarea 
                          value={generatedWordlist.join('\n')}
                          readOnly
                          className="bg-zinc-900/70 border-white/5 min-h-[400px] font-mono text-sm"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default WordlistGenerator;
