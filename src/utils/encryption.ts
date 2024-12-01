export const caesarCipher = (text: string, shift: number, decrypt = false): string => {
  const actualShift = decrypt ? (26 - shift) : shift;
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + actualShift) % 26) + base);
      }
      return char;
    })
    .join('');
};

export const base64 = {
  encode: (text: string): string => btoa(text),
  decode: (text: string): string => atob(text)
};

export const generateAESKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const aesEncrypt = async (text: string, key: CryptoKey): Promise<string> => {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    encoded
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
};

export const aesDecrypt = async (encrypted: string, key: CryptoKey): Promise<string> => {
  const decoder = new TextDecoder();
  const data = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  
  const iv = data.slice(0, 12);
  const ciphertext = data.slice(12);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv
    },
    key,
    ciphertext
  );

  return decoder.decode(decrypted);
};

export const generateRSAKeyPair = async (): Promise<CryptoKeyPair> => {
  return await window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
};

export const rsaEncrypt = async (text: string, publicKey: CryptoKey): Promise<string> => {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    encoded
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
};

export const rsaDecrypt = async (encrypted: string, privateKey: CryptoKey): Promise<string> => {
  const decoder = new TextDecoder();
  const data = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    data
  );

  return decoder.decode(decrypted);
};