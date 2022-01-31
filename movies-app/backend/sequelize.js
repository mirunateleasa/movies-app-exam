const { Sequelize } = require('sequelize');
require ('dotenv').config({});

let sequelize;

if (process.env.NODE_ENV === 'development') //locally
{
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './sqlite/movies.db'
    });
}
else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {   //remotely (on Heroku)
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}


module.exports = sequelize;