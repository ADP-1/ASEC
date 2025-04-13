
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Github, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5"
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center">
          <Shield className="h-8 w-8 text-white mr-2" />
          <h1 className="text-white font-bold text-xl tracking-tighter">ASEC++</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-right space-x-6">
          <Button 
            variant="ghost"
            className="text-white/80 hover:bg-white/5"
            asChild
          >
            <a 
              href="https://github.com/adp-1/asec" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub Repo <ArrowRight className="h-4 w-4 ml-2 -rotate-45" />
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="bg-zinc-800/50 text-white border-white/10 hover:bg-white/10"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About
          </Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 md:hidden focus-ring rounded-md"
        >
          {isMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-light"
        >
          <div className="flex flex-col space-y-4 p-6">
            <Link 
              to="/password-generator" 
              className="text-white/80 hover-effect py-2 text-sm tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Password Generator
            </Link>
            <Link 
              to="/wordlist-generator" 
              className="text-white/80 hover-effect py-2 text-sm tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Wordlist Generator
            </Link>
            <Link 
              to="/auth" 
              className="text-white/80 hover-effect py-2 text-sm tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Button 
              variant="outline" 
              className="bg-zinc-800/50 text-white border-white/10 hover:bg-white/10 w-full"
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
