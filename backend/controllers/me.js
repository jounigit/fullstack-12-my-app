const router = require('express').Router();
const { User } = require('../models');
const { tokenExtractor, sessionChecker } = require('../util/middleware');

router.get('/', tokenExtractor, sessionChecker, async (req, res) => {
  const me = await User.findByPk(req.userId, 
    {attributes: {
      exclude: ['passwordHash']
    }}
  );
  if (!me) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(me);
});

module.exports = router;