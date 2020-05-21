const express = require('express');
const encryptionController = require('../controllers/encryption-controller');

var router = express.Router();

router.use(function(req, res, next) {
  data = null;

  try {
    authorization = req.header('Authorization');

    if (!authorization) {
      throw new Error('No Authorization Header');
    }

    decryptedData = encryptionController.decryptAsymmetric(authorization);

    data = JSON.parse(decryptedData);

    if (!(data instanceof Object)) {
      throw new Error('Not in JSON format');
    }

    if(!data.key) {
      throw new Error('Shared key could not be found');
    }

    if(!data.iv) {
      throw new Error('Initialization vector could not be found');
    }
  }
  catch(error) {
    error.status = 401;
    throw error;
  }

  req.authorization = data;

  next();
});

module.exports = router;
