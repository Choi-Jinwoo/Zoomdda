const Sequelize = require('sequelize');

const { mysql: config } = require('../../config/database.json');

const TimeTable = require('./TimeTable');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
  },
);

sequelize.TimeTable = TimeTable;

sequelize.sync({ force: false }).then(() => {
  console.log('[MODEL - SYNC] DB 연결')
}).catch(err => {
  console.log('[MODEL - SYNC] DB 연결 오류')
});

const models = {
  TimeTable,
  sequelize,
  Sequelize,
};
