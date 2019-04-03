import createError from 'http-errors';
import express from 'express';
const app = express();
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { sequelizeVietNamWork, sequelizeMuaSamCong } from "./sequelize";
import cors from 'cors'
import bodyParser from 'body-parser'
import config from 'config'
import { Connection } from 'tedious'


// var session = require('express-session');

// var SequelizeStore = require('connect-session-sequelize')(session.Store);
// app.use(cookieParser());

// var myStore = new SequelizeStore({
//   db: sequelizeStock,
//   checkExpirationInterval: 24 * 60 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds. // 24h
//   expiration: 30 * 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session. // 1 thang
// })

// app.use(
//   session(
//     {
//       secret: 'mabimat',
//       store: myStore,
//       resave: false,
//       saveUninitialized: true,
//       cookie: { secure: false },
//       proxy: true
//     }
//   )
// )
// myStore.sync();

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const routes = require(__dirname + "/routes")
app.use(routes)



sequelizeVietNamWork
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully database sql server VietNamWork");
  })
  .catch(err => {
    console.error("Unable to connect to the database: VietNamWork", err);
  });

sequelizeMuaSamCong
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully database sql server MuaSamCong");
  })
  .catch(err => {
    console.error("Unable to connect to the database: MuaSamCong", err);
  });


// const configTerios = {
//   userName: config.get("sqlStock.user"),
//   password: config.get("sqlStock.password"),
//   server: config.get("sqlStock.host"),
//   options: {
//     encrypt: true,
//     database: config.get("sqlStock.database"),
//     rowCollectionOnDone: true,
//     useColumnNames: true,
//     rowCollectionOnRequestCompletion: true
//   }
// };

// export const connection = new Connection(configTerios);
// connection.on('connect', err => {
//   if (err) {
//     console.log('Connection Failed By Tedious');
//     throw err;
//   } else {
//     console.log('Connection Success By Tedious');
//   }
// })

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
