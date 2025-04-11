
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

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
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            className="h-8 w-8 rounded-md bg-purple flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold text-lg">A++</span>
          </motion.div>
          <h1 className="text-white font-bold text-xl tracking-tighter">ASEC++</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/password-generator" className="text-white/80 hover-effect text-sm tracking-wide">Password Generator</Link>
          <Link to="/wordlist-generator" className="text-white/80 hover-effect text-sm tracking-wide">Wordlist Generator</Link>
          {/* Removed Login link and Get Started button */}
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
              onClick={() => setIsMenuOpen(false)}
              asChild
            >
              <Link to="/">
                Get Started
              </Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
