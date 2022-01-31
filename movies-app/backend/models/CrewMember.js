const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const CrewMember = sequelize.define('CrewMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [5, 200]
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['DIRECTOR', 'WRITER', 'ACTOR']
    }
});

module.exports = CrewMember;