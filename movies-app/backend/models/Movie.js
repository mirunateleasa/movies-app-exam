const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [3, 200]
    },
    category: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['COMEDY', 'HORROR', 'ACTION', 'DOCUMENTARY']
    },
    pubDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
});

module.exports = Movie;