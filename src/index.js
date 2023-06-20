const express = require('express');
const auth = require('./middleware/auth');
const talkManager = require('./talkManager');
const tokenGenerate = require('./middleware/tokenGenerate');
const validateLogin = require('./middleware/validateLogin');
const validateName = require('./middleware/validateName');
const validateAge = require('./middleware/validateAge');
const { validateTalk, validateTalkKeys } = require('./middleware/validateTalk');
const validateSearchRate = require('./middleware/validateSearchRate');
const validateSearchDate = require('./middleware/validateSearchDate');
const { validateUpdateRate, validateUpdate } = require('./middleware/validateUpdateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

//--------------------------------------------------------------------------
app.get(
  '/talker/search',
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

app.get('/talker', async (__req, res) => {
  const talkers = await talkManager.getAllTalkers();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkManager.getTalkerById(Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

app.post('/login', validateLogin, (__req, res) => {
  const tokenNumber = tokenGenerate();
  return res.status(200).json({ token: tokenNumber });
});

app.post(
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

app.put(
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

app.delete(
  '/talker/:id',
  auth,
  async (req, res) => {
    const { id } = req.params;
    const deleteTalker = await talkManager.deleteTalker(id);
    return res.status(204).json(deleteTalker);
  },
  
);

app.patch(
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
