import {
    IChatConnectorSettings,
    ChatConnector,
    UniversalBot
} from 'botbuilder';

import { add_luis_triggers } from './luis';

const settings: IChatConnectorSettings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

var connector = new ChatConnector(settings);
var bot = new UniversalBot(connector);

bot = add_luis_triggers(bot);

bot.dialog("/", function(session) {
    session.send("Sorry, I don't understand your request")
})

export {
    connector,
    bot
};