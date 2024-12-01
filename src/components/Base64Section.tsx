import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Binary } from 'lucide-react';
import { EncryptionCard, CopyButton } from './EncryptionCard';
import { Input } from './Input';
import * as crypto from '../utils/encryption';

export const Base64Section: React.FC = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleEncode = () => {
    if (!input) return;
    try {
      setEncoded(crypto.base64.encode(input));
      setDecoded('');
    } catch (err) {
      console.error('Encoding failed:', err);
    }
  };

  const handleDecode = () => {
    if (!encoded) return;
    try {
      setDecoded(crypto.base64.decode(encoded));
    } catch (err) {
      console.error('Decoding failed:', err);
    }
  };

  return (
    <EncryptionCard
      title="Base64 Encoding"
      description="Standard base64 encoding/decoding"
      icon={<Binary className="w-6 h-6 text-blue-600" />}
    >
      <div className="space-y-4">
        <Input
          label="Text to encode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text..."
        />
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEncode}
            disabled={!input}
            className="btn btn-primary"
          >
            Encode
          </motion.button>
        </div>
        {encoded && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Encoded Text"
                value={encoded}
                readOnly
                multiline
              />
              <div className="absolute top-8 right-2">
                <CopyButton text={encoded} />
              </div>
            </div>
            <div className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDecode}
                className="btn btn-secondary"
              >
                Decode
              </motion.button>
            </div>
          </div>
        )}
        {decoded && (
          <div className="relative">
            <Input
              label="Decoded Text"
              value={decoded}
              readOnly
              multiline
            />
            <div className="absolute top-8 right-2">
              <CopyButton text={decoded} />
            </div>
          </div>
        )}
      </div>
    </EncryptionCard>
  );
};