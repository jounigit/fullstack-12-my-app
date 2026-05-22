const router = require('express').Router();
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const { User, Blog, ReadingLists } = require('../models');
const { tokenExtractor, sessionChecker } = require('../util/middleware');

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

const userFinder = async (req, res, next) => {
    req.user = await User.findOne({ where: { username: req.params.username } });
    if (!req.user) {
      return res.status(404).json({ error: 'User not found' });
    }
    next();
};

router.put('/:username',tokenExtractor, sessionChecker, userFinder, async (req, res, next) => {
     try {         
        // const user = req.user;   
        req.user.name = req.body.name;
        await req.user.save();
        res.json(req.user);
    } catch (err) {
        console.error('Error:', err);
        next(err);
    }
}); 

router.delete('/:username', userFinder, async (req, res, next) => {
    try {
        const user = req.user;
        await user.destroy();
        res.status(204).end();
    } catch (err) {
        console.error('Error:', err);
        next(err);
    }
});

module.exports = router;
