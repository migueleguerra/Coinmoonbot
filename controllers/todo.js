"use strict";

const Telegram = require("telegram-node-bot");

class TodoController extends Telegram.TelegramBaseController {
	addHandler($) {
		let todo = $.message.text.split(" ").slice(1).join(" ");

		if (!todo) return $.sendMessage("sorry, please pass a todo item");

		$.getUserSession("todos")
			.then(todos => {
				if (!Array.isArray(todos)) return $.setUserSession("todos", [todo]);
				else $.setUserSession("todos", todos.concat([todo]));

				console.log(todo);
				$.sendMessage("Added new todo!");
			});
	}

	getHandler($) {
		$.getUserSession("todos").then(todos => {
			$.sendMessage(this._serializerList(todos), {parse_mode: "Markdown"});
		});
	}

	get routes() {
		return {
			"addCommand": "addHandler",
			"getCommand": "getHandler"
		};
	}

	_serializerList(todoList) {
		let serialized = "*Your todos:*\n\n";
		todoList.forEach((t, i) => {
			serialized += "*" + i + "* - " + t + "\n";
		});
		return serialized;
	}
}

module.exports = TodoController;