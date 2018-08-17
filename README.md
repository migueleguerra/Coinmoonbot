# Coinmoonbot

Coinmoonbot is a Telegram bot that gives you information about the full coin market cap, a single coin, and converts cryptocurrency amount to fiat currency (USD, EUR, MXN & CAD) and vice versa.

## Getting Started

Download by clicking the download button or clone the Github repertory using the following command:

```
$ git clone https://github.com/Guetop/uam-c-gestion.git
```

### Prerequisites

These are the programs you need to have installed in you local computer:

- [Node.js](https://nodejs.org/)
- [GIT](https://git-scm.com/)
- [NPM](https://www.npmjs.com/)

### Installing

A step by step series of examples that tell you how to get a development env running

Navigate to the folder and run the following command to install all the dependencies:

```
$ npm install
```

Inside of the _config_ folder you need to to create a new file call _dev.js_, inside that file you need to add the following code with the token acquire from the [Botfather](https://core.telegram.org/bots):

```
module.exports = {
  telegram_key: <YOUR-BOT-TOKEN>
};
```

Go back to the previous folder and start the bot using Node.js executing the following command:

```
$ node index.js
```

## Bot Commands

These are the commands use to talk to the bot on Telegram.

This command will give you information of the bot commands:

```
/start
```
example:

![captura de pantalla 2018-07-10 a la s 16 29 08](https://user-images.githubusercontent.com/17505216/44280625-ec2cab80-a21a-11e8-85e5-803d962211cb.png)

This command will give you information of a single coin:

```
/cm (cryptocurrency name or abbreviation)
```
example:

![captura de pantalla 2018-07-10 a la s 16 33 55](https://user-images.githubusercontent.com/17505216/44280714-2138fe00-a21b-11e8-9e12-82acd411e1d6.png)


This command will convert the cryptocurrency value to fiat money value _(only USD, EUR, MXN & CAD)_ and vice versa:

```
/convert (amount) (currency) to (currency)
```
example:

![captura de pantalla 2018-08-17 a la s 12 50 32](https://user-images.githubusercontent.com/17505216/44281169-80e3d900-a21c-11e8-8ae0-2a178a368e2b.png)

or

```
/convert (currency) to (currency)
```
example:

![captura de pantalla 2018-08-17 a la s 12 51 12](https://user-images.githubusercontent.com/17505216/44281241-b8528580-a21c-11e8-8f29-9ade6a422b8a.png)

This command will give you information of the full coin market cap:

```
/fcm
```
example:

![captura de pantalla 2018-08-17 a la s 12 49 47](https://user-images.githubusercontent.com/17505216/44281275-dddf8f00-a21c-11e8-919c-ce92ad4db036.png)

## Built With

- [Telegram API](https://core.telegram.org/) - Bot API
- [telegram-node-bot@4.0.5](https://www.npmjs.com/package/telegram-node-bot) - Telegram dependency to create interactions with the bot in Node.js
- [request@2.83.0](https://www.npmjs.com/package/request) - simplified HTTP client
- [coinmarketcap API](https://coinmarketcap.com/api/) - API for cryptocurrency information

## Authors

- **Miguel Guerra** - _Initial work_
