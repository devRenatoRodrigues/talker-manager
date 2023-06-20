const auth = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
    if (typeof token === 'string' && token.length === 16) {
      next(); 
    } else {
      res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = auth;
