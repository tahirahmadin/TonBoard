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

export const getTimeLeftFormatter = (timeInSecs = 0) => {
  let timeGone = Math.floor(timeInSecs / (60 * 60 * 1000));
  return 6 - timeGone;
};

export const getNumbersInFormat = (num) => {
  var units = ["", "K", "M", "B", "T", "Q"];
  var unit = (num / 1.0e1).toFixed(0).toString().length;
  var r = unit % 3;
  var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
  return (
    (Math.round(x) == x ? x : x.toFixed(2)) + " " + units[Math.floor(unit / 3)]
  );
};

export const getNumbersInFormatOnlyMillions = (num) => {
  var units = ["", "", "M", "B", "T", "Q"];
  if (num < 1000000) {
    return numberWithCommas(num);
  }
  var unit = (num / 1.0e1).toFixed(0).toString().length;
  var r = unit % 3;
  var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
  return (
    (Math.round(x) == x ? x : x.toFixed(2)) + " " + units[Math.floor(unit / 3)]
  );
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
