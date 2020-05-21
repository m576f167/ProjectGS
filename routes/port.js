const express = require('express');
const encryptionController = require('../controllers/encryption-controller');
const portManagerController = require('../controllers/port-manager-controller');

const authorization = require('../middleware/authorization');
const decryption = require('../middleware/decryption');

var router = express.Router();

router.use(decryption);

/* GET portStatus. */
router.get('/status', function(req, res, next) {
  response = encryptionController.encryptSymmetric(
    JSON.stringify(portManagerController.getPortInfo()),
    req.authorization.key,
    req.authorization.iv
  );

  res.send(response);
});

/* Update Port. */
router.post('/update', authorization, function(req, res, next) {
  try {
    decryptedBody = JSON.parse(
      encryptionController.decryptAsymmetric(req.body.data)
    );

    port = decryptedBody.port;

    if(!port) {
      throw new Error('Port is not defined');
    }
  }
  catch(error) {
    error.status = 422;
    throw error;
  }

  portManagerController.updatePort(port);
  res.status(200).end();
});

module.exports = router;
