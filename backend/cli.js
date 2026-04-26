require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function printBlogs() {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database');

    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT });
    console.log(blogs);
    sequelize.close();

  } catch (err) {
    console.error('Error:', err);
  } 
}

printBlogs();
