const express = require('express');
const encryptionController = require('../controllers/encryption-controller');
const portManagerController = require('../controllers/port-manager-controller');

const authorization = require('../middleware/authorization');
const decryption = require('../middleware/decryption');

var router = express.Router();

router.use(decryption);

/* GET portStatus. */
router.post('/status', function(req, res, next) {
  response = encryptionController.encryptSymmetric(
    JSON.stringify(portManagerController.getPortInfo()),
    req.body.data.key
  );

  res.send(response);
});

/* Update Port. */
router.post('/update', authorization, function(req, res, next) {
  port = req.body.data.port;

  if(!port) {
    error = new Error('Port is not defined');
    error.status = 422;
    throw error;
  }

  portManagerController.updatePort(port);
  res.status(200).end();
});

module.exports = router;
