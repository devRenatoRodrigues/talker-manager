const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateLogin = (req, res, next) => {
    const { password, email } = req.body;
    if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    if (password.length < 6) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }
    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    if (!emailRegex.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
      next();
  };

  module.exports = validateLogin;