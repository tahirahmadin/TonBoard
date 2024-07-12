import CryptoJS from "crypto-js";

export const getDecryptedData = (cypherText) => {
  // Decrypt
  let cypherKey = process.env.REACT_APP_CIPHER_KEY;
  let secretKey = CryptoJS.enc.Utf8.parse(cypherKey);
  try {
    var decryptedData = CryptoJS.AES.decrypt(cypherText, secretKey, {
      mode: CryptoJS.mode.ECB,
    }).toString(CryptoJS.enc.Utf8);

    return { data: decryptedData };
  } catch (err) {
    throw err;
  }
};
