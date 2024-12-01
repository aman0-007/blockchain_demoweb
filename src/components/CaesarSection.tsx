import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { EncryptionCard, CopyButton } from './EncryptionCard';
import { Input } from './Input';
import * as crypto from '../utils/encryption';

export const CaesarSection: React.FC = () => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(3);
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    if (!input) return;
    const result = crypto.caesarCipher(input, shift);
    setEncrypted(result);
    setDecrypted('');
  };

  const handleDecrypt = () => {
    if (!encrypted) return;
    const result = crypto.caesarCipher(encrypted, shift, true);
    setDecrypted(result);
  };

  return (
    <EncryptionCard
      title="Caesar Cipher"
      description="Classic substitution cipher"
      icon={<RotateCcw className="w-6 h-6 text-blue-600" />}
    >
      <div className="space-y-4">
        <Input
          label="Text to encrypt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Shift Amount: {shift}
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEncrypt}
            disabled={!input}
            className="btn btn-primary"
          >
            Encrypt
          </motion.button>
        </div>
        {encrypted && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Encrypted Text"
                value={encrypted}
                readOnly
                multiline
              />
              <div className="absolute top-8 right-2">
                <CopyButton text={encrypted} />
              </div>
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDecrypt}
                className="btn btn-secondary"
              >
                Decrypt
              </motion.button>
            </div>
          </div>
        )}
        {decrypted && (
          <div className="relative">
            <Input
              label="Decrypted Text"
              value={decrypted}
              readOnly
              multiline
            />
            <div className="absolute top-8 right-2">
              <CopyButton text={decrypted} />
            </div>
          </div>
        )}
      </div>
    </EncryptionCard>
  );
};