
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { KeyRound, Lock, ArrowDown, List, FileText, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Linkedin, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4 relative">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,126,245,0.15),rgba(0,0,0,0)_50%)]"></div>
        </div>
        
        <div className="container mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="h-10 w-10 rounded-md bg-purple flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient tracking-tighter leading-tight mb-4">
              Secure Password &<br />Wordlist Generator
            </h1>
            <p className="text-xl text-white/60 mb-8 max-w-lg mx-auto">
              Generate strong, unpredictable passwords and customized wordlists with ASEC++, the advanced security toolkit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-purple hover:bg-purple-light text-white"
                asChild
              >
                <Link to="/password-generator">
                  <Lock className="h-4 w-4 mr-2" />
                  Generate Passwords
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/10 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/wordlist-generator">
                  <List className="h-4 w-4 mr-2" />
                  Generate Wordlists
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <button 
              className="flex flex-col items-center text-white/40 hover:text-white/60 transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm mb-1">Explore Features</span>
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-zinc-900/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Advanced Security Tools</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              ASEC++ provides comprehensive security tools designed for cybersecurity professionals and enthusiasts
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <div className="h-12 w-12 rounded-md bg-purple/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Password Generator</h3>
              <p className="text-white/60 mb-4">
                Create strong, unpredictable passwords with our advanced generator featuring categorization, expiry times, and strength analysis.
              </p>
              <Button asChild>
                <Link to="/password-generator">
                  Try Password Generator
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass p-6 rounded-xl"
            >
              <div className="h-12 w-12 rounded-md bg-purple/20 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Wordlist Generator</h3>
              <p className="text-white/60 mb-4">
                Create customized wordlists for targeted security assessments based on detailed information about individuals or organizations.
              </p>
              <Button asChild>
                <Link to="/wordlist-generator">
                  Try Wordlist Generator
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <motion.section 
        id="about"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-zinc-900/20 border-t border-white/5"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center">
              <Shield className="h-8 w-8 mr-2" />
              <h2 className="text-3xl font-bold text-gradient">
                About ASEC++
              </h2>
            </div>
            <p className="text-white/80 text-lg leading-relaxed max-w-3xl mx-auto">
              Developed by Aditya Pandey<br />
              ASEC++ is an open-source cybersecurity toolkit focused on 
              providing enterprise-grade password generation and wordlist creation capabilities 
              for penetration testers and security researchers.
            </p>
            <div className="flex justify-center space-x-6 mt-8">
              <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="text-white/80 hover:text-purple hover:bg-white/5"
              >
                <a href="https://github.com/adp-1" target="_blank" rel="noopener">
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button 
                asChild
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-purple hover:bg-white/5"
              >
                <a href="https://www.linkedin.com/in/adhax" target="_blank" rel="noopener">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </a>
              </Button>
            </div>
            <p className="mt-8 text-white/40 text-sm font-mono">
              Version 1.0.0
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Index;
