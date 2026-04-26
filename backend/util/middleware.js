const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Session, User } = require('../models');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7);
      req.decodedToken = jwt.verify(token, SECRET)
      req.userId = req.decodedToken.id
      req.token = token;
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
};

const sessionChecker = async (req, res, next) => {
  const session = await Session.findOne({ where: { token: req.token, isActive: true } });
  if (!session) {
    console.log('Session not found or inactive for token:', req.token);
    return res.status(401).json({ error: 'expired token' });
  }
  // const user = await User.findByPk(session.userId);
  // if (user.disabled) {
  //   return res.status(403).json({ error: 'user account is disabled' });
  // }
  next();
};

module.exports = {
  tokenExtractor,
  sessionChecker
};
