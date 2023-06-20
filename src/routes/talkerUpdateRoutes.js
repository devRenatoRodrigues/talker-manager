const express = require('express');
const talkManager = require('../utils/talkManager');
const auth = require('../middleware/auth');
const validateName = require('../middleware/validateName');
const validateAge = require('../middleware/validateAge');
const { validateTalk, validateTalkKeys } = require('../middleware/validateTalk');
const { validateUpdate, validateUpdateRate } = require('../middleware/validateUpdateRate');

const updateTalkers = express.Router();

updateTalkers.post(
    '/talker',
    auth,
    validateName,
    validateAge,
    validateTalk,
    validateTalkKeys,
    async (req, res) => {
      const { body } = req;
      const addTalker = await talkManager.postNewTalker(body);
      return res.status(201).json(addTalker);
    },
    
  );
  
  updateTalkers.put(
    '/talker/:id',
    auth,
    validateName,
    validateAge,
    validateTalk,
    validateTalkKeys,
    async (req, res) => {
      const { body } = req;
      const { id } = req.params;
      try {
      const updatedTalker = await talkManager.editTalker(id, body);
      return res.status(200).json(updatedTalker);
      } catch (error) {
        return res.status(404).json({ message: error.message });
      }
    },
    
  );
  
  updateTalkers.delete(
    '/talker/:id',
    auth,
    async (req, res) => {
      const { id } = req.params;
      const deleteTalker = await talkManager.deleteTalker(id);
      return res.status(204).json(deleteTalker);
    },
    
  );
  
  updateTalkers.patch(
    '/talker/rate/:id',
    auth,
    validateUpdate,
    validateUpdateRate,
    async (req, res) => {
      const { rate } = req.body;
      const { id } = req.params;
      const updateRate = await talkManager.updateRate(id, rate);
      return res.status(204).json(updateRate);
    },
    
  );
  
  module.exports = updateTalkers;