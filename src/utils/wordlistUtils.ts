export interface HumanTarget {
  fullName?: string;
  nickname?: string;
  birthDate?: string;
  mobileNumber?: string;
  petName?: string;
  spouseName?: string;
  childrenNames?: string;
  favoriteTeam?: string;
  favoriteColor?: string;
  hometown?: string;
  favoriteHobby?: string;
  favoriteMovie?: string;
  additionalKeywords?: string;
}

export interface OrganizationTarget {
  organizationName?: string;
  abbreviation?: string;
  foundingYear?: string;
  domain?: string;
  location?: string;
  industry?: string;
  products?: string;
  slogan?: string;
  ceoName?: string;
}

export interface GenerationOptions {
  minLength?: number;
  maxLength?: number;
  count?: number;
  generatePINs?: boolean;
}

export type TargetType = 'human' | 'organization';

export const generateHumanWordlist = (target: HumanTarget, options: GenerationOptions = {}): string[] => {
  let wordlist: string[] = [];
  const currentYear = new Date().getFullYear();

  // Process full name
  if (target.fullName) {
    const nameParts = target.fullName.split(' ');
    nameParts.forEach(part => {
      if (part.length > 2) {
        wordlist.push(part.toLowerCase());
        wordlist.push(part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
      }
    });
    
    if (nameParts.length > 1) {
      // First and last name combinations
      const firstName = nameParts[0];
      const lastName = nameParts[nameParts.length - 1];
      
      wordlist.push(firstName.toLowerCase() + lastName.toLowerCase());
      wordlist.push(firstName.toLowerCase() + "." + lastName.toLowerCase());
      wordlist.push(firstName.charAt(0).toLowerCase() + lastName.toLowerCase());
      wordlist.push(lastName.toLowerCase() + firstName.charAt(0).toLowerCase());
      wordlist.push(firstName.toLowerCase() + lastName.charAt(0).toLowerCase());
    }
  }
  
  // Process nickname
  if (target.nickname && target.nickname.length > 2) {
    wordlist.push(target.nickname.toLowerCase());
    wordlist.push(target.nickname.charAt(0).toUpperCase() + target.nickname.slice(1).toLowerCase());
  }
  
  // Process birth date
  if (target.birthDate) {
    const dateParts = target.birthDate.split(/[-\/]/);
    if (dateParts.length === 3) {
      const year = dateParts[2];
      const month = dateParts[0].padStart(2, '0');
      const day = dateParts[1].padStart(2, '0');
      
      wordlist.push(year);
      wordlist.push(month + day);
      wordlist.push(day + month);
      wordlist.push(month + day + year);
      wordlist.push(day + month + year);
      wordlist.push(year + month + day);
    }
  }
  
  // Process mobile number
  if (target.mobileNumber) {
    const digitsOnly = target.mobileNumber.replace(/\D/g, '');
    if (digitsOnly.length >= 6) {
      wordlist.push(digitsOnly);
      // Last 4 digits
      wordlist.push(digitsOnly.substring(digitsOnly.length - 4));
    }
  }
  
  // Process pet name
  if (target.petName && target.petName.length > 2) {
    wordlist.push(target.petName.toLowerCase());
    wordlist.push(target.petName.charAt(0).toUpperCase() + target.petName.slice(1).toLowerCase());
  }
  
  // Process spouse name
  if (target.spouseName) {
    const spouseNameParts = target.spouseName.split(' ');
    if (spouseNameParts.length > 0) {
      const firstName = spouseNameParts[0];
      wordlist.push(firstName.toLowerCase());
      wordlist.push(firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase());
    }
  }
  
  // Process children names
  if (target.childrenNames) {
    const children = target.childrenNames.split(',').map(name => name.trim());
    children.forEach(child => {
      if (child.length > 2) {
        wordlist.push(child.toLowerCase());
        wordlist.push(child.charAt(0).toUpperCase() + child.slice(1).toLowerCase());
      }
    });
  }
  
  // Process favorite team
  if (target.favoriteTeam && target.favoriteTeam.length > 2) {
    wordlist.push(target.favoriteTeam.toLowerCase());
    wordlist.push(target.favoriteTeam.charAt(0).toUpperCase() + target.favoriteTeam.slice(1).toLowerCase());
  }
  
  // Process favorite color
  if (target.favoriteColor && target.favoriteColor.length > 2) {
    wordlist.push(target.favoriteColor.toLowerCase());
    wordlist.push(target.favoriteColor.charAt(0).toUpperCase() + target.favoriteColor.slice(1).toLowerCase());
  }
  
  // Process hometown
  if (target.hometown && target.hometown.length > 2) {
    wordlist.push(target.hometown.toLowerCase());
    wordlist.push(target.hometown.charAt(0).toUpperCase() + target.hometown.slice(1).toLowerCase());
  }
  
  // Process favorite hobby
  if (target.favoriteHobby && target.favoriteHobby.length > 2) {
    wordlist.push(target.favoriteHobby.toLowerCase());
    wordlist.push(target.favoriteHobby.charAt(0).toUpperCase() + target.favoriteHobby.slice(1).toLowerCase());
  }
  
  // Process favorite movie
  if (target.favoriteMovie && target.favoriteMovie.length > 2) {
    wordlist.push(target.favoriteMovie.toLowerCase());
    wordlist.push(target.favoriteMovie.replace(/\s+/g, '').toLowerCase());
  }
  
  // Process additional keywords
  if (target.additionalKeywords) {
    const keywords = target.additionalKeywords.split(',').map(keyword => keyword.trim());
    keywords.forEach(keyword => {
      if (keyword.length > 2) {
        wordlist.push(keyword.toLowerCase());
        wordlist.push(keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase());
      }
    });
  }
  
  // Generate combinations
  let uniqueWords = Array.from(new Set(wordlist));
  let combinations: string[] = [...uniqueWords];
  
  // Add number suffix/prefix variations
  uniqueWords.forEach(word => {
    if (word.length > 3) {
      combinations.push(word + '1');
      combinations.push(word + '123');
      combinations.push(word + '!');
      combinations.push(word + '@');
      combinations.push(word + '#');
      combinations.push(word + currentYear.toString());
      combinations.push(word + (currentYear - 1).toString());
    }
  });
  
  // Apply length filters if specified
  if (options.minLength || options.maxLength) {
    combinations = combinations.filter(word => {
      const length = word.length;
      if (options.minLength && length < options.minLength) return false;
      if (options.maxLength && length > options.maxLength) return false;
      return true;
    });
  }
  
  // Generate PINs if requested
  if (options.generatePINs) {
    const pins: string[] = [];
    const numericSourceData: string[] = [];
    
    // Extract numeric information
    if (target.birthDate) {
      const dateParts = target.birthDate.split(/[-\/]/);
      if (dateParts.length === 3) {
        numericSourceData.push(dateParts[2]); // year
        numericSourceData.push(dateParts[0]); // month
        numericSourceData.push(dateParts[1]); // day
        numericSourceData.push(dateParts[0] + dateParts[1]); // month + day
        numericSourceData.push(dateParts[1] + dateParts[0]); // day + month
      }
    }
    
    if (target.mobileNumber) {
      const digits = target.mobileNumber.replace(/\D/g, '');
      if (digits.length >= 4) {
        numericSourceData.push(digits.slice(-4)); // last 4 digits
        if (digits.length >= 6) {
          numericSourceData.push(digits.slice(-6)); // last 6 digits
        }
      }
    }
    
    // Generic common PINs
    ["1234", "0000", "1111", "2222", "9999", "1212", "1004"].forEach(pin => {
      pins.push(pin);
    });
    
    // Year-based PINs
    const currentYear2Digits = currentYear.toString().slice(-2);
    pins.push(currentYear2Digits + "00");
    pins.push(currentYear2Digits + "12");
    pins.push(currentYear2Digits + "34");
    pins.push(currentYear2Digits + "56");
    pins.push(currentYear2Digits + "78");
    pins.push(currentYear2Digits + "99");
    
    // Add numeric information from target
    numericSourceData.forEach(data => {
      if (data.length === 4) pins.push(data);
      if (data.length === 6) pins.push(data.slice(0, 4));
      if (data.length === 8) {
        pins.push(data.slice(0, 4));
        pins.push(data.slice(4, 8));
      }
    });
    
    // Remove duplicates and add to combinations
    const uniquePins = Array.from(new Set(pins));
    combinations = uniquePins;
  }
  
  // Limit the number of results if specified
  if (options.count && options.count > 0 && options.count < combinations.length) {
    // Shuffle array first to get random selection if limited
    for (let i = combinations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinations[i], combinations[j]] = [combinations[j], combinations[i]];
    }
    combinations = combinations.slice(0, Math.min(options.count, 99999));
  }
  
  // Return unique words
  return Array.from(new Set(combinations));
};

export const generateOrganizationWordlist = (target: OrganizationTarget, options: GenerationOptions = {}): string[] => {
  let wordlist: string[] = [];
  
  // Process organization name
  if (target.organizationName) {
    const words = target.organizationName.split(' ').filter(w => w.length > 0);
    wordlist.push(...words);
    wordlist.push(...words.map(word => word.toLowerCase()));
    wordlist.push(words.join(''));
    wordlist.push(words.join('').toLowerCase());
  }
  
  // Process abbreviation
  if (target.abbreviation) {
    wordlist.push(target.abbreviation);
    wordlist.push(target.abbreviation.toLowerCase());
  }
  
  // Process founding year
  if (target.foundingYear) {
    wordlist.push(target.foundingYear);
  }
  
  // Process domain
  if (target.domain) {
    const domainParts = target.domain.split('.')[0].split('-');
    wordlist.push(...domainParts);
    wordlist.push(...domainParts.map(part => part.toLowerCase()));
  }
  
  // Add other fields
  if (target.location) {
    const locations = target.location.split(',').map(loc => loc.trim());
    wordlist.push(...locations);
    wordlist.push(...locations.map(loc => loc.toLowerCase()));
  }
  
  if (target.industry) wordlist.push(target.industry, target.industry.toLowerCase());
  if (target.slogan) {
    const sloganWords = target.slogan.split(' ').filter(w => w.length > 3);
    wordlist.push(...sloganWords.map(word => word.toLowerCase()));
  }
  if (target.ceoName) {
    const ceoNameParts = target.ceoName.split(' ');
    wordlist.push(...ceoNameParts);
    wordlist.push(...ceoNameParts.map(part => part.toLowerCase()));
  }
  
  if (target.products) {
    const products = target.products.split(',').map(prod => prod.trim());
    wordlist.push(...products);
    wordlist.push(...products.map(prod => prod.toLowerCase()));
  }
  
  // Generate common combinations
  const combinations: string[] = [];
  
  const baseElements = [
    target.organizationName?.split(' ')[0]?.toLowerCase(),
    target.abbreviation?.toLowerCase(),
    ...((target.products?.split(',').map(p => p.trim().toLowerCase())) || [])
  ].filter(Boolean) as string[];
  
  const suffixes = [
    target.foundingYear,
    ...((target.location?.split(',').map(l => l.trim().toLowerCase())) || [])
  ].filter(Boolean) as string[];
  
  // Generate combinations
  baseElements.forEach(base => {
    suffixes.forEach(suffix => {
      combinations.push(`${base}${suffix}`);
      combinations.push(`${base}_${suffix}`);
    });
  });
  
  // Add combinations to wordlist
  wordlist.push(...combinations);
  
  // Apply length filters if specified
  if (options.minLength || options.maxLength) {
    wordlist = wordlist.filter(word => {
      const length = word.length;
      if (options.minLength && length < options.minLength) return false;
      if (options.maxLength && length > options.maxLength) return false;
      return true;
    });
  }
  
  // Generate PINs if requested
  if (options.generatePINs) {
    const pins: string[] = [];
    
    // Generic common PINs
    ["1234", "0000", "1111", "2222", "9999", "1212", "1004"].forEach(pin => {
      pins.push(pin);
    });
    
    // Year-based PINs from founding year
    if (target.foundingYear && target.foundingYear.length === 4) {
      pins.push(target.foundingYear);
      pins.push(target.foundingYear.slice(-2) + "00");
      pins.push(target.foundingYear.slice(-2) + "99");
      pins.push(target.foundingYear.slice(0, 2) + target.foundingYear.slice(-2));
    }
    
    // Remove duplicates and replace wordlist
    const uniquePins = Array.from(new Set(pins));
    return uniquePins;
  }
  
  // Limit the number of results if specified
  if (options.count && options.count > 0 && options.count < wordlist.length) {
    // Shuffle array first to get random selection if limited
    for (let i = wordlist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordlist[i], wordlist[j]] = [wordlist[j], wordlist[i]];
    }
    wordlist = wordlist.slice(0, Math.min(options.count, 99999));
  }
  
  // Remove duplicates and filter out very short words
  return [...new Set(wordlist)].filter(word => word.length >= 3);
};
