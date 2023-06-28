const express = require('express');
const talkManager = require('../utils/talkManager');
const talkerDB = require('../utils/TalkerDB');
const auth = require('../middleware/auth');
const validateSearchDate = require('../middleware/validateSearchDate');
const validateSearchRate = require('../middleware/validateSearchRate');

const getTalkers = express.Router();

getTalkers.get('/talker/db', async (__req, res) => {
  const talkers = await talkerDB.getAll();
  return res.status(200).json(talkers);
});

getTalkers.get(
  '/search',
 auth,
 validateSearchDate,
 validateSearchRate,
  async (req, res) => {
  const term = req.query.q;
  const { rate, date } = req.query;
  const searchTermAndRate = await talkManager.getSearch(term, rate, date);
  return res.status(200).json(searchTermAndRate);
},
);

getTalkers.get('/', async (__req, res) => {
    const talkers = await talkManager.getAllTalkers();
    return res.status(200).json(talkers);
  });
  
  getTalkers.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await talkManager.getTalkerById(Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
  });

  module.exports = getTalkers;