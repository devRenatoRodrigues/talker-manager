const express = require('express');
const tokenGenerate = require('../middleware/tokenGenerate');
const validateLogin = require('../middleware/validateLogin');

const login = express.Router();

login.post('/', validateLogin, (__req, res) => {
    const tokenNumber = tokenGenerate();
    return res.status(200).json({ token: tokenNumber });
  });

  module.exports = login;