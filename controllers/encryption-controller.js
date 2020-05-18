const EncryptionAsymmetric = require('../modules/encryption-asymmetric.js');
const EncryptionSymmetric = require('../modules/encryption-symmetric.js');

const encryptionAsymmetric = new EncryptionAsymmetric();
const encryptionSymmetric = new EncryptionSymmetric();

/**
 * Get the public key
 *
 * @return string the string containing the public key
 */
function getPublicKey() {
  return encryptionAsymmetric.getPublicKey().exportKey('pkcs8-public-pem');
}

/**
 * Encrypt data using asymmetric cryptography
 *
 * @param data string the data to be encrypted
 *
 * @return string the encrypted data
 */
function encryptAsymmetric(data) {
  return encryptionAsymmetric.encrypt(data).toString();
}

/**
 * Decrypt data using asymmetric cryptography
 *
 * @param data string the data to be decrypted
 *
 * @return string the decrypted data
 */
function decryptAsymmetric(data) {
  return encryptionAsymmetric.decrypt(data).toString();
}

/**
 * Encrypt data using symmetric cryptography
 *
 * @param data string the data to be encrypted
 * @param key string the key for encryption
 *
 * @return string the encrypted data
 */
function encryptSymmetric(data, key) {
  return encryptionSymmetric.encrypt(data, key);
}

/**
 * Decrypt data using symmetric cryptography
 *
 * @param data string the data to be decrypted
 * @param key string the key for decryption
 *
 * @return string the decrypted data
 */
function decryptSymmetric(data, key) {
  return encryptionSymmetric.decrypt(data, key);
}

module.exports = {
  getPublicKey,
  encryptAsymmetric,
  decryptAsymmetric,
  encryptSymmetric,
  decryptSymmetric
}
