import CryptoJS from 'crypto-js';

const getKey = () => {
  const key = import.meta.env.VITE_ENCODE_KEY;
  if (!key) {
    throw new Error('Encryption key is not set');
  }
  return key;
};

export const Encrypted = (text: string) => {
  try {
    const key = getKey();
    const encoded = CryptoJS.AES.encrypt(text, key).toString();
    const encodedKey = `${encoded}${key}`;
    const encoded2 = btoa(encodedKey);
    return encoded2;
  } catch (error) {
    // console.error('Error during encryption:', error);
    return null;
  }
};

export const Decrypted = (text: string) => {
  try {
    const key = getKey();
    if (!text) {
      throw new Error('No text provided for decryption');
    }
    const decoded = atob(text);
    const decodedKey = decoded.replace(key, '');
    const decoded2 = CryptoJS.AES.decrypt(decodedKey, key).toString(CryptoJS.enc.Utf8);
    return decoded2;
  } catch (error) {
    // console.error('Error during decryption:', error);
    return null;
  }
};
