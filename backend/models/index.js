const User = require('./user');
const Blog = require('./blog');
const ReadingLists = require('./reading_list');
const Session = require('./session');

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' });
Blog.belongsToMany(User, { through: ReadingLists, as: 'readers' });

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  ReadingLists,
  Session
};