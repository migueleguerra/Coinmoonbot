"use strict";
var request = require("request");
const Telegram = require("telegram-node-bot");

var _comaNumber = function(num){
	if(num != null){
	    var	num1 = num.split(".")[0];
	    var	num2 = num.split(".")[1];

	    if(num2 == null) num2 = 0;
	        
	   	if(num1.length > 3){
	   		var cont = 0;
	   		var position = 0;
	   		var res = "";
	   		for(var i = num1.length; i > 0; i--)
	   		{
	   			cont++;
	   			if((cont % 3 == 0) && (i != 1)){
	   				res = "," + num1.substr(i - 1, 3) + res;
	   				position = cont;
	   			}
	   		}
	   		var res1 = num1.substr(0, num1.length - position);
	   		return res1 + res + "." + num2;
	   	}	
	   	else{
	   		return num;
	   	}
	}

	return num;
}

class InfoController extends Telegram.TelegramBaseController {
	cmHandler($){
		var cm = "";
		var msg = $.message.text.split(" ").slice(1);

		if(msg.length == 1) cm = msg[0].toUpperCase();
		else{
			cm = msg[0].toUpperCase();
			for(var i = 1; i < msg.length; i++)
				cm += "-" + msg[i].toUpperCase(); 
		} 

		if(!cm) return $.sendMessage("`/cm <cryptocurrency name>`", {parse_mode: "Markdown"});
		else{
			var coinDictionary = {};
			var dicObj = {}

			request.get("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0", function(err ,res , data){
				dicObj = JSON.parse(data);

				for (var i = 0; i < dicObj.length; i++){
					coinDictionary[dicObj[i].symbol.toUpperCase()] = dicObj[i].id;  
				}

				if (cm in coinDictionary) cm = coinDictionary[cm];

				request.get("https://api.coinmarketcap.com/v1/ticker/" + cm + " /", function(err,res,body){ 
					var obj = JSON.parse(body);
					if(obj.error) return $.sendMessage("`'" + msg + "' doesn't exist!`", {parse_mode: "Markdown"});
					else {
						var p1 = obj[0].percent_change_1h, p24 = obj[0].percent_change_24h, s1, s24;

						if (p1 < 0)  s1 = "▼";
						else s1 = "▲";

						if (p24 < 0) s24 = "▼";
						else s24 = "▲";


				  		var str = "``` " + obj[0].name + " (" + obj[0].symbol + ")\n" +
				  				  " $" + _comaNumber(obj[0].price_usd) + "  Ƀ" + obj[0].price_btc + "  1h:" + p1 + "% " + s1 +"  24h:" + p24 + "% " + s24 + "\n" +
				  				  " MrktCap: " + _comaNumber(obj[0].market_cap_usd) + "\n" +
				  				  " Vol24h: " + _comaNumber(obj[0]["24h_volume_usd"]) + "\n" +
				  				  " CrcSupply: " + _comaNumber(obj[0].available_supply) +  "```";
				  		$.sendMessage(str, {parse_mode: "Markdown"});
				  	}
				});
			});
		}
	}

	convertHandler($) {
		var convert = $.message.text.split(" ").slice(1);
		var num, con1, con2; 

		if(isNaN(convert[0])) {
			con1 = convert[0];
			con2 = convert[2];
		}
		else {
			num = convert[0];
			con1 = convert[1];
			con2 = convert[3];
		}

		if (con1 == null || con2 == null) $.sendMessage("`/convert [amount] <currency> to <currency>`", {parse_mode: "Markdown"});
		else {

			var conv1 = con1.toUpperCase();
			var conv2 = con2.toUpperCase();

			if ((conv1 == "MXN" || conv1 == "CAD" || conv1 == "EUR" || conv1 == "USD") &&
			(conv2 == "MXN" || conv2 == "CAD" || conv2 == "EUR" || conv2 == "USD")) {

				request.get("https://api.fixer.io/latest?base=" + conv1, function(err,res,body) {
					var obj = JSON.parse(body);
					var newobj = obj.rates[conv2];
					if(num == null) $.sendMessage("*" + _comaNumber(newobj.toString()) + " " + conv2 + "*", {parse_mode: "Markdown"});
					else {
						var newNum = num * newobj;
						$.sendMessage("*" + _comaNumber(newNum.toString()) + " " + conv2 + "*", {parse_mode: "Markdown"});
					}
				});

			} 
			else if (conv2 == "MXN" || conv2 == "CAD" || conv2 == "EUR" || conv2 == "USD") {

				var coinDictionary = {};
				var dicObj = {}

				request.get("https://api.coinmarketcap.com/v1/ticker/?start=0&limit=0", function(err ,res , data){
					dicObj = JSON.parse(data);

					for (var i = 0; i < dicObj.length; i++){
						coinDictionary[dicObj[i].symbol.toUpperCase()] = dicObj[i].id;  
					}

					if (conv1 in coinDictionary) conv1 = coinDictionary[conv1];

					request.get("https://api.coinmarketcap.com/v1/ticker/" + conv1 + "/?convert=" + conv2, function(err,res,body) {
						var obj = JSON.parse(body);
						if(obj.error) return $.sendMessage("`'" + conv1 + "' doesn't exist!`", {parse_mode: "Markdown"});
						else {
							var conv2low = "price_" + conv2.toLowerCase();
							var newobj = obj[0][conv2low];
							if(num == null) $.sendMessage("*" + _comaNumber(newobj.toString()) + " " + conv2 + "*", {parse_mode: "Markdown"});
							else {
								var newNum = num * newobj;
								$.sendMessage("*" + _comaNumber(newNum.toString()) + " " + conv2 + "*", {parse_mode: "Markdown"});
							}
						}
					});
				});
			}
			else $.sendMessage("`/convert [amount] <currency> to <currency>`", {parse_mode: "Markdown"});
		}
	}	

	fcmHandler($) {
		request.get("https://api.coinmarketcap.com/v1/global/", function(err,res,body) {
			var obj = JSON.parse(body);
			console.log(obj);
			var str = "``` Total Market Cap: $" + _comaNumber(obj.total_market_cap_usd.toString()) + "\n" +
	  				  " Total 24h Volume: $" + _comaNumber(obj.total_24h_volume_usd.toString()) + "\n" +
	  				  " BTC Porcentage: " + obj.bitcoin_percentage_of_market_cap + "% " + "```";
			$.sendMessage(str, {parse_mode: "Markdown"});
		});
	}

	get routes() {
		return {
			"cmCommand": "cmHandler",
			"convertCommand": "convertHandler",
			"fcmCommand": "fcmHandler"
		}
	}
}

module.exports = InfoController;