
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import PasswordGenerator from '../components/PasswordGenerator';
import Footer from '../components/Footer';

const PasswordGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        <div className="pt-24 pb-4 px-4">
        </div>
          <PasswordGenerator />
      </div>
      
      <Footer />
    </div>
  );
};

export default PasswordGeneratorPage;
