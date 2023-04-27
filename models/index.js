const User = require('./User');
const Blog = require(`./blog`)

Blog.belongsTo(User,{
    foreignKey:`User_id`,onDelete:`Cascade`
  });

module.exports = { User,Blog };
