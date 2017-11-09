import {
    IChatConnectorSettings,
    ChatConnector,
    UniversalBot
} from 'botbuilder';

import { 
    initLuis,
    extractCustomerEntity 
} from './luis';

import {
    findCustomer
} from './navision';

const settings: IChatConnectorSettings = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

var connector = new ChatConnector(settings);
var bot = new UniversalBot(connector);

initLuis(bot);

bot.dialog("GetCustomerAddress", [
    // Waterfal dialog
    extractCustomerEntity,
    findCustomer
])
.triggerAction({
    matches: 'GetCustomerAddress'
})


bot.dialog("/", function(session) {
    session.send("Sorry, I don't understand your request")
})

export {
    connector,
    bot
};