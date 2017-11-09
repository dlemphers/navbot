import {
    EntityRecognizer,
    LuisRecognizer
} from 'botbuilder';

function extractCustomerEntity(session, args, next) {
    console.log("Builder found " + JSON.stringify(args));

    var customerName = EntityRecognizer.findEntity(args.intent.entities, 'customer');

    if(customerName) {
        session.send("I see you're looking for an address for " + customerName.entity + "...");
        next({ customerName: customerName.entity });
    }
}

var initLuis = function(bot): any {
    bot.recognizer(new LuisRecognizer(process.env.LUIS_ENDPOINT as string));
} 

export {
    initLuis,
    extractCustomerEntity
};