
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import WordlistGenerator from '../components/WordlistGenerator';
import Footer from '../components/Footer';

const WordlistGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="pt-24 pb-4 px-4">
          <div className="container mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gradient text-center mb-6"
            >
              Wordlist Generator
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white/60 text-center mb-8 max-w-2xl mx-auto"
            >
              Create customized wordlists for targeted security testing based on specific entity details
            </motion.p>
          </div>
        </div>
        
        {/* Wordlist Generator Component */}
        <WordlistGenerator />
      </div>
      
      <Footer />
    </div>
  );
};

export default WordlistGeneratorPage;
