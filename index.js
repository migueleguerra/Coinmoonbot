'use strict';
const Telegram = require('telegram-node-bot');
const keys = require('./config/keys');

const tg = new Telegram.Telegram(keys.telegram_key, {
  workers: 1
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
