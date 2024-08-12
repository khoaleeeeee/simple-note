import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPT_SECRET_KEY);
const iv = CryptoJS.enc.Hex.parse(import.meta.env.VITE_ENCRYPT_IV);

const decrypt = (encryptedText) => {
	const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey, { iv: iv });
	return decrypted.toString(CryptoJS.enc.Utf8);
};

export default decrypt;
