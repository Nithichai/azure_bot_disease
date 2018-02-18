require('dotenv').config();
var restify = require('restify');
var builder = require('botbuilder');
var request = require('request');
var querystring = require('querystring');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var answer = null;

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var config = {
    userName: 'serveradmin', // update me
    password: 'zZ123456', // update me
    server: 'geekapp.database.windows.net', // update me
    options: {
       database: 'learn' //update me
       , encrypt: true
    }
}
var connection = new Connection(config);

// Receive messages from the user and respond by echoing each message back
var bot = new builder.UniversalBot(connector, function (session) {
    utterance = session.message.text;
    var endpoint = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/";
    var luisAppId = 'fee0c321-eea4-44ce-b7ad-14e12c03415a';

    // Set the LUIS_SUBSCRIPTION_KEY environment variable
    // to the value of your Cognitive Services subscription key
    var queryParams = {
        // "subscription-key": process.env.LUIS_SUBSCRIPTION_KEY,
        "subscription-key": '9896f2d87c5445ffb7f21500b8fcb93a',
        "spellCheck": true,
        "timezoneOffset": "0",
        "verbose":  true,
        "q": utterance
    }

    var luisRequest = endpoint + luisAppId + '?' + querystring.stringify(queryParams);
    request(luisRequest, function (err, response, body) {
        var is_found = false;
        if (err)
            console.log(err);
        else { 
            var data = JSON.parse(body);
            for(var i = 0; i < data.intents.length; i++) {
                if (data.intents[i].score > 0.5) {
                    is_found = true;
                    session.send(`You should be ${data.intents[i].intent}`);
                    connection.on('connect', function(err) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            request = new Request(
                                "SELECT * FROM student",
                                function(err, rowCount, rows) 
                                {
                                    console.log(rowCount + ' row(s) returned');
                                    process.exit();
                                }
                            );

                            request.on('row', function(columns) {
                                columns.forEach(function(column) {
                                    session.send(`You should be ${column.metadata.colName}`);
                                    console.log("%s\t%s", column.metadata.colName, column.value);
                                });
                            });
                            connection.execSql(request);
                        }
                    });
                }
            }
        }
        if (!is_found) {
            session.send(`You should more specify the symptoms`);
        }
    });
});
