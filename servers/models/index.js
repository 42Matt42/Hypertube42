//reference: https://sequelize.readthedocs.io/en/1.7.0/articles/express/
const {Sequelize} = require('sequelize');
const config = require('../config/config');
const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);

const db = {};


const dbc = new Sequelize(config.db, config.dbUser, config.dbPassword, {
    host: config.host,
    dialect: 'mysql',
    port: config.dbPort,
    define: {
        timestamps: false,
    },

});

//test connection
dbc
    .authenticate()
    .then(function () {

    })
    .catch(function (err) {
        //err
    });


fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = dbc['import'](path.join(__dirname, file));
        db[model.name] = model;
    });


//run associate if exists
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});



db.dbc = dbc;
db.Sequelize = Sequelize;

module.exports = db;