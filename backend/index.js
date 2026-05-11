const express = require('express');
const cors = require('cors');
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { Blog, User, ReadingLists, Session } = require('./models');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorsRouter = require('./controllers/authors');
const readingListsRouter = require('./controllers/readinglists');
const meRouter = require('./controllers/me');

const app = express();
app.use(cors());

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
};

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello API!' });
});

app.post('/api/reset', async (req, res, next) => {
  try {
    await Blog.destroy({ where: {}, truncate: true, restartIdentity: true, cascade: true });
    await User.destroy({ where: {}, truncate: true, restartIdentity: true, cascade: true });
    await ReadingLists.destroy({ where: {}, truncate: true, restartIdentity: true, cascade: true });
    await Session.destroy({ where: {}, truncate: true, restartIdentity: true, cascade: true });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/me', meRouter);

app.use(errorHandler);

const startServer = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();