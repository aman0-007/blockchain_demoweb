import {
  createSHA1,
  createSHA256,
  createSHA384,
  createSHA512,
  createMD5
} from 'hash-wasm';

export const hashAlgorithms = {
  MD5: async (text: string): Promise<string> => {
    const hasher = await createMD5();
    hasher.init();
    hasher.update(text);
    return hasher.digest('hex');
  },
  SHA1: async (text: string): Promise<string> => {
    const hasher = await createSHA1();
    hasher.init();
    hasher.update(text);
    return hasher.digest('hex');
  },
  SHA256: async (text: string): Promise<string> => {
    const hasher = await createSHA256();
    hasher.init();
    hasher.update(text);
    return hasher.digest('hex');
  },
  SHA384: async (text: string): Promise<string> => {
    const hasher = await createSHA384();
    hasher.init();
    hasher.update(text);
    return hasher.digest('hex');
  },
  SHA512: async (text: string): Promise<string> => {
    const hasher = await createSHA512();
    hasher.init();
    hasher.update(text);
    return hasher.digest('hex');
  }
};