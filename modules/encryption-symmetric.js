const CryptoJS = require('crypto-js');

module.exports = (function() {
  /**
   * Constructor for encryption symmetric module
   *
   * @constructor
   * @param pathPublicKey string the path to the public key
   * @param pathPrivateKey string the path to the private key
   */
  function EncryptionSymmetric() {
    if (!(this instanceof EncryptionSymmetric)) {
      return new EncryptionSymmetric();
    }

    this.$aes = CryptoJS.AES;
  }

  /**
   * Encrypt data using the key
   *
   * @param data string the data to be enrypted
   * @param key string the key for encryption
   * @param iv string the initialization vector
   *
   * @return string the string containing encrypted data
   */
  EncryptionSymmetric.prototype.encrypt = function(data, key, iv) {
    return this.$aes.encrypt(
      data,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString();
  }

  /**
   * Decrypt data using the key
   *
   * @param data string the data to be decrypted
   * @param key string the key for decryption
   * @param iv string the initialization vector
   *
   * @return string the utf-8 encoded string containing the decrypted data
   */
  EncryptionSymmetric.prototype.decrypt = function(data, key, iv) {
    return this.$aes.decrypt(
      data,
      CryptoJS.enc.Utf8.parse(key),
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    ).toString(CryptoJS.enc.Utf8);
  }

  return EncryptionSymmetric;
})()

