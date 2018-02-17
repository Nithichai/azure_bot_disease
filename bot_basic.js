var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector, function (session) {
    if (session.message.text == "MEOW")
    // session.send("You said: %s", session.message.text);
        session.send("You mean: %s", "cat");
    else
        session.send("You said: %s", session.message.text);
});