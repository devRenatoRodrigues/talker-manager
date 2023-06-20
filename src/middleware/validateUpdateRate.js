const validateUpdateRate = (req, res, next) => {
    const { rate } = req.body;
    if (!Number.isInteger(Number(rate)) || Number(rate) > 5 || Number(rate) <= 0) {
      return res
      .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
  };

  const validateUpdate = (req, res, next) => {
    const { rate } = req.body;
    if (!rate && rate !== 0) {
        return res
        .status(400).json({ message: 'O campo "rate" é obrigatório' });
    } 
    next();
  };

module.exports = { validateUpdateRate, validateUpdate };