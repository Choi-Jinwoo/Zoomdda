const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { mysql: config } = require('../../config/database.json');

const models = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  },
);


fs.readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js') && (!fs.statSync(path.join(__dirname, file)).isDirectory()))
  .forEach((file) => {
    const extName = path.extname(path.join(__dirname, file));
    const baseName = path.basename(path.join(__dirname, file), extName);

    const model = sequelize.import(path.join(__dirname, file));
    models[baseName] = model;
  });

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log('[MODEL - SYNC] DB 연결')
}).catch(err => {
  console.log('[MODEL - SYNC] DB 연결 오류')
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;