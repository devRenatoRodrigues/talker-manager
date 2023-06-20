const regexDate = /^\d{2}\/\d{2}\/\d{4}$/;

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    if (!talk.watchedAt) {
      return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!talk.rate && talk.rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    next();
};

const validateTalkKeys = (req, res, next) => {
    const { talk } = req.body;
if (!Number.isInteger(talk.rate) || talk.rate > 5 || talk.rate <= 0) {
    return res
    .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
}
if (!regexDate.test(talk.watchedAt)) {
  return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
}
next();
};
module.exports = { validateTalk, validateTalkKeys };