const router = require('express').Router();
const { Blog, User } = require('../models');
const { tokenExtractor, sessionChecker } = require('../util/middleware');
const { Op } = require('sequelize');

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id);
    if (!req.blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    next();
};

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: ['name']
      },
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${req.query.search || ''}%` } },
          {author: { [Op.iLike]: `%${req.query.search || ''}%` } }
        ]
      },
      order: [['likes', 'DESC']]
    });

    res.json(blogs);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', tokenExtractor, sessionChecker, async (req, res, next) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      userId: req.userId
    });
    return res.status(201).json(newBlog);
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

router.delete('/:id', tokenExtractor, sessionChecker, blogFinder, async (req, res) => {
  if (req.blog.userId !== req.userId) {
    return res.status(403).json({ error: 'Forbidden: This is not your blog.' });
  }
  await req.blog.destroy();
  res.status(204).end();
});

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

module.exports = router;