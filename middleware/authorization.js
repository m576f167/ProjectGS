const express = require('express');

const secret = process.env.ADMIN_SECRET || 'admin';

var router = express.Router();

router.use(function(req, res, next) {
  clientSecret = req.authorization.secret;

  if((!clientSecret) || (secret.localeCompare(clientSecret) != 0)) {
    error = new Error('Unauthorized');
    error.status = 401;
    throw error;
  }

  next();
});

module.exports = router;
