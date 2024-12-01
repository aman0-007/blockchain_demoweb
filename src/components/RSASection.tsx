import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { EncryptionCard, CopyButton } from './EncryptionCard';
import { Input } from './Input';
import * as crypto from '../utils/encryption';

interface RSASectionProps {
  rsaKeys: CryptoKeyPair | null;
}

export const RSASection: React.FC<RSASectionProps> = ({ rsaKeys }) => {
  const [input, setInput] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    if (!input || !rsaKeys?.publicKey) return;
    setLoading(true);
    try {
      const result = await crypto.rsaEncrypt(input, rsaKeys.publicKey);
      setEncrypted(result);
      setDecrypted('');
    } catch (err) {
      console.error('Encryption failed:', err);
    }
    setLoading(false);
  };

  const handleDecrypt = async () => {
    if (!encrypted || !rsaKeys?.privateKey) return;
    setLoading(true);
    try {
      const result = await crypto.rsaDecrypt(encrypted, rsaKeys.privateKey);
      setDecrypted(result);
    } catch (err) {
      console.error('Decryption failed:', err);
    }
    setLoading(false);
  };

  return (
    <EncryptionCard
      title="RSA Encryption"
      description="Public-key cryptography (2048-bit)"
      icon={<Key className="w-6 h-6 text-blue-600" />}
    >
      <div className="space-y-4">
        <Input
          label="Text to encrypt"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
        />
        <div className="flex justify-end space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEncrypt}
            disabled={!input || loading || !rsaKeys}
            className="btn btn-primary"
          >
            {loading ? 'Processing...' : 'Encrypt'}
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
                disabled={loading || !rsaKeys}
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