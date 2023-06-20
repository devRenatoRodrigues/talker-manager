const validateSearchRate = (req, res, next) => {
    const { rate } = req.query;
    const rateNumber = Number(rate);
    if (!Number.isInteger(rateNumber) || rateNumber > 5 || rateNumber <= 0) {
        return res
        .status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

module.exports = validateSearchRate;