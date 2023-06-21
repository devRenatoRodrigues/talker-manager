const express = require('express');
const getTalkers = require('./routes/getTalkersRoutes');
const updateTalkers = require('./routes/talkerUpdateRoutes');
const login = require('./routes/loginRoute');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, async () => {
  console.log('Online');
});

app.use(login);
app.use(getTalkers);
app.use(updateTalkers);

//--------------------------------------------------------------------------
