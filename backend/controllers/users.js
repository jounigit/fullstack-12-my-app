const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User, Blog, ReadingLists } = require('../models');

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['passwordHash'] },
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
      }
    });
    res.json(users);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const readFilter = {};
  if (req.query.read === 'true') {
    readFilter.read = true;  
  } else if (req.query.read === 'false') {
    readFilter.read = false; 
  }
  try {
    const user = await User.findWithReadings(req.params.id, readFilter);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:username', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
  
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    console.log('Password hash:', passwordHash);

    const newUser = await User.create({
      username,
      name,
      passwordHash
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

router.put('/:username', async (req, res, next) => {
        try {
        const user = await User.findOne({ where: { username: req.params.username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.name = req.body.name;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error('Error:', err);
        next(err);
    }
}); 

module.exports = router;
