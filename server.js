'use strict';
const Telegram = require('telegram-node-bot');
const express = require('express');
const packageInfo = require('./package.json');
const keys = require('./config/keys');

const app = express();

app.get('/', function(req, res) {
  res.json({ version: packageInfo.version });
});

var PORT;
if (process.env.NODE_ENV === 'production') PORT = process.env.PORT;

const tg = new Telegram.Telegram(keys.telegram_key, {
  workers: 1,
  webAdmin: {
    port: PORT,
    host: 'localhost'
  }
});

const InfoController = require('./controllers/info');
const StartController = require('./controllers/start');
const OtherwiseController = require('./controllers/other');
const infoCtrl = new InfoController();

tg.router
  .when(new Telegram.TextCommand('/cm', 'cmCommand'), infoCtrl)
  .when(new Telegram.TextCommand('/convert', 'convertCommand'), infoCtrl)
  .when(new Telegram.TextCommand('/fcm', 'fcmCommand'), infoCtrl)
  .when(
    new Telegram.TextCommand('/start', 'startCommand'),
    new StartController()
  )
  .otherwise(new OtherwiseController());

app.listen(process.env.PORT);
