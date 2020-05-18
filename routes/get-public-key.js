const express = require('express');
const encryptionController = require('../controllers/encryption-controller');

var router = express.Router();

/* GET public key. */
router.get('/', function(req, res, next) {
  res.json(
    {
      key: encryptionController.getPublicKey()
    }
  );
});

module.exports = router;
