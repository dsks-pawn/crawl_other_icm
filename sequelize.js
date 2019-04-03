import Sequelize from 'sequelize';
import config from 'config';

const optionVietNamWork = {
  "dialect": config.get("sqlVietNamWork.dialect"),
  "host": config.get("sqlVietNamWork.host"),
  "database": config.get("sqlVietNamWork.database"),
  "user": config.get("sqlVietNamWork.user"),
  "password": config.get("sqlVietNamWork.password")
}

const optionMuaSamCong = {
  "dialect": config.get("sqlMuaSamCong.dialect"),
  "host": config.get("sqlMuaSamCong.host"),
  "database": config.get("sqlMuaSamCong.database"),
  "user": config.get("sqlMuaSamCong.user"),
  "password": config.get("sqlMuaSamCong.password")
}

export const sequelizeVietNamWork = new Sequelize(optionVietNamWork.database, optionVietNamWork.user, optionVietNamWork.password, {
  host: optionVietNamWork.host,
  port: 1433,
  dialect: optionVietNamWork.dialect,
  operatorsAliases: false,
  databaseVersion: "10.50.1617.0",
  dialectOptions: {
    encrypt: false,
    instansName: 'sqlexpress'
  },
  options: {
    encrypt: true
  },
  query: { raw: true },
  logging: false,
  define: {
    raw: true,
    underscored: false,
    freezeTableName: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: false
  },
  sync: { force: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const sequelizeMuaSamCong = new Sequelize(optionMuaSamCong.database, optionMuaSamCong.user, optionMuaSamCong.password, {
  host: optionMuaSamCong.host,
  port: 1433,
  dialect: optionMuaSamCong.dialect,
  operatorsAliases: false,
  databaseVersion: "10.50.1617.0",
  dialectOptions: {
    encrypt: false,
    instansName: 'sqlexpress'
  },
  options: {
    encrypt: true
  },
  query: { raw: true },
  logging: false,
  define: {
    raw: true,
    underscored: false,
    freezeTableName: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: false
  },
  sync: { force: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export const Op = Sequelize.Op;