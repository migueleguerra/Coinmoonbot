'use strict';
const Telegram = require('telegram-node-bot');

class StartController extends Telegram.TelegramBaseController {
  startHandler($) {
    let msg =
      "Sup guys, I'm Coinmoonbot! add me to groups to make you moon!\n\n" +
      'Commands:\n\n' +
      '`/cm <cryptocurrency name>`\n' +
      '*Gets current info of that cryptocurrency*\n\n' +
      '`/convert [amount] <currency> to <currency>`\n' +
      'or\n' +
      '`/convert <currency> to <currency>`\n' +
      '*Do currency conversions with crytpocurrency and fiat*\n' +
      'Fiat: EUR, USD, MXN & CAD\n\n' +
      '`/fcm`\n' +
      '*Gets the full coin market cap data*\n\n\n' +
      'If something is broke PM me @Guetop';

    $.sendMessage(msg, { parse_mode: 'Markdown' });
  }

  get routes() {
    return {
      startCommand: 'startHandler'
    };
  }
}

module.exports = StartController;
