const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const { User, Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');


router.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  const passwordCorrect = user
    ? await bcrypt.compare(password, user.passwordHash)
    : false;

  console.log('user:', user);
  console.log('passwordCorrect:', passwordCorrect);

    if (!(user && passwordCorrect)) {
    return res.status(401).json({ 
        error: 'invalid username or password' 
    });
  } else if (user.disabled) {
    return res.status(403).json({ 
        error: 'user account is disabled' 
    });
  }

  console.log(user)

    const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  // Create a session for the token
  await Session.create({
    userId: user.id,
    token: token
  });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;