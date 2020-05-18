const express = require('express');
const encryptionController = require('../controllers/encryption-controller');

var router = express.Router();

router.use(function(req, res, next) {
  data = null;

  try {
    decryptedData = encryptionController.decryptAsymmetric(req.body.data);

    data = JSON.parse(decryptedData);

    if(!(data instanceof Object) || !data.key) {
      throw new Error('Shared key could not be found');
    }
  }
  catch(error) {
    error.status = 422;
    throw error;
  }

  req.body.data = data;

  next();
});

module.exports = router;
