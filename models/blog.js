const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Blog extends Model{

}


Blog.init(

 { 
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  information:{
    type: DataTypes.TEXT,
    allowNull: false,
  },


    
 },
 {sequelize,
  modelName: 'Blog',
}
 

);
module.exports = Blog;