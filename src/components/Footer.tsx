import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass border-t border-white/5 py-8 px-4"
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0 justify-start">
            <img 
              src="/images/asec-logo.svg"
              className="h-8 w-8 mr-2"
              alt="ASEC++ Logo"
            />
            <h2 className="text-white font-bold text-xl tracking-tighter">ASEC++</h2>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-white/60 text-sm">Secure Password & Wordlist Generator</p>
            <p className="text-white/40 text-xs mt-1">
              ©{new Date().getFullYear()} ASEC++. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
