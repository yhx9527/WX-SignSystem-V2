import CryptoJS from "../crypto-js/crypto-js.js";
const Base64 = require("./base64.js");
const secret = require("../secret.js");
//秘钥
const CRYPTOJSKEY = secret.locationkey;

//加密
/*
* {param} plaintText 加密明文
* return  str 加密结果
*/
function encrypt(plaintText) {
  var plaintText = plaintText;
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  //console.log('keyb'+CRYPTOJSKEY);
  var key = CryptoJS.enc.Base64.parse(CRYPTOJSKEY);
  //var key = 'JWmPJIqFj+Lxu4GbO/RP7w==';
  //console.log('keya'+key);
  var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
  var encryptedBase64Str = encryptedData.toString();
  return encryptedBase64Str;
}
//解密
/*
* {param} plaintText 解密密文
* return  str 解密结果
*/
function decrypt(encryptedBase64Str, type) {

  var encryptedBase64Str = encryptedBase64Str;
  var options = {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  };
  var key = CryptoJS.enc.Base64.parse(CRYPTOJSKEY);
  //var key = CRYPTOJSKEY;
  // 解密
  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, options);
  // 解密后，需要按照Utf8的方式将明文转位字符串
  var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}
module.exports={
  decrypt: decrypt,
  encrypt: encrypt
};