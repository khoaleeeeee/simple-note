import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPT_SECRET_KEY);
const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPT_IV);

const encrypt = (text) => {
	const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv: iv });
	return encrypted.toString();
};

export default encrypt;
