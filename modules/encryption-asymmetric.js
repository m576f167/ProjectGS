const sshpk = require('sshpk');
const NodeRSA = require('node-rsa');

module.exports = (function() {
  /**
   * Constructor for encryption asymmetric module
   *
   * @constructor
   * @param publicKeyString string the public key string
   * @param privateKeyString string the private key string
   */
  function EncryptionAsymmetric({
    publicKeyString = null,
    privateKeyString = null
  } = {}) {
    if (!(this instanceof EncryptionAsymmetric)) {
      return new EncryptionAsymmetric({
        publicKeyString,
        privateKeyString
      });
    }

    var config = {
      publicKeyString: publicKeyString || process.env.PUBLIC_KEY,
      privateKeyString: privateKeyString || process.env.PRIVATE_KEY
    }

    try {
      publicKey = new NodeRSA(
        sshpk.parseKey(config.publicKeyString).toBuffer('pkcs8'),
        'pkcs8-public-pem'
      );
      privateKey = new NodeRSA(
        sshpk.parsePrivateKey(config.privateKeyString).toBuffer('pkcs8'),
        'pkcs8-private-pem'
      );
    }
    catch (error) {
      console.error(error);

      key = new NodeRSA().generateKeyPair();

      publicKey = new NodeRSA(key.exportKey('pkcs8-public-pem'));
      privateKey = new NodeRSA(key.exportKey('pkcs8-private-pem'));

      console.log('Generated Public/Private key pair');
    }

    config.publicKey = publicKey;
    config.privateKey = privateKey;

    this.$config = config;
  }

  /**
   * Get the public key in current config
   *
   * @return Buffer the buffer containing the public key
   */
  EncryptionAsymmetric.prototype.getPublicKey = function() {
    return this.$config.publicKey;
  }

  /**
   * Get the private key in current config
   *
   * @return Buffer the buffer containing the private key
   */
  EncryptionAsymmetric.prototype.getPrivateKey = function() {
    return this.$config.privateKey;
  }

  /**
   * Encrypt data using the public key
   *
   * @param data string the data to be enrypted
   *
   * @return Buffer the buffer containing encrypted data
   */
  EncryptionAsymmetric.prototype.encrypt = function(data) {
    return this.$config.publicKey.encrypt(data, 'base64');
  }

  /**
   * Decrypt data using the private key
   *
   * @param data string the data to be decrypted
   *
   * @return Buffer the buffer containing decrypted data
   */
  EncryptionAsymmetric.prototype.decrypt = function(data) {
    return this.$config.privateKey.decrypt(data);
  }

  return EncryptionAsymmetric;
})();
