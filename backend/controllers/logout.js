const router = require('express').Router();

const { Session } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.delete('/', tokenExtractor, async (req, res) => {
  const token = req.token;

  // Find and deactivate the session
  const session = await Session.findOne({ where: { token: token } });
  if (session) {
    await session.update({ isActive: false });
  }

  res.status(204).end();
});

module.exports = router;