const validateSearchDate = (req, res, next) => {
  const { date } = req.query;
  if (date) {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      return res
        .status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
  }
  next();
};

module.exports = validateSearchDate;
