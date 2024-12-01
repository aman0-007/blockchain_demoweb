import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AESSection } from '../components/AESSection';
import { RSASection } from '../components/RSASection';
import { Base64Section } from '../components/Base64Section';
import { CaesarSection } from '../components/CaesarSection';
import { HashSection } from '../components/HashSection';
import * as crypto from '../utils/encryption';

export const ToolkitDemo: React.FC = () => {
  const [aesKey, setAesKey] = useState<CryptoKey | null>(null);
  const [rsaKeys, setRsaKeys] = useState<CryptoKeyPair | null>(null);

  useEffect(() => {
    const initializeKeys = async () => {
      try {
        const [newAesKey, newRsaKeys] = await Promise.all([
          crypto.generateAESKey(),
          crypto.generateRSAKeyPair()
        ]);
        setAesKey(newAesKey);
        setRsaKeys(newRsaKeys);
      } catch (err) {
        console.error('Failed to initialize keys:', err);
      }
    };
    initializeKeys();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cryptographic Toolkit</h1>
        <p className="text-gray-600">
          Explore various encryption methods and hash functions
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <HashSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AESSection aesKey={aesKey} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RSASection rsaKeys={rsaKeys} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Base64Section />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <CaesarSection />
        </motion.div>
      </div>
    </div>
  );
};