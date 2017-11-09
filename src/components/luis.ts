import {
    EntityRecognizer,
    LuisRecognizer
} from 'botbuilder';

function ExtractCustomerEntity(session, args, next) {
    console.log("Builder found " + JSON.stringify(args));

    var customerName = EntityRecognizer.findEntity(args.intent.entities, 'customer');

    if(customerName) {
        session.send("I see you're looking for an address for " + customerName.entity + "...");
        next({ customerName: customerName.entity });
    }
}

function FindCustomerInNAV(session, data) {
    console.log("Looking up " + data.customerName);
    session.send("Looking up " + data.customerName + " in Microsoft Dynamics NAV");

    // var client = soap.createClient(nav_url, { wsdl_headers: { Authorization: nav_auth } }, (err, client) => {
    //     if (err) {
    //         throw err;
    //     } else {
    //         client.setSecurity(new soap.BasicAuthSecurity(nav_username, nav_password));
    //         client.GetCreditLimit({customerNoOrName: '10000'}, function(error, result, raw, header) {
    //             console.log( result.return_value );
    //             session.send(result.return_value);
    
    //         });
    //     }
    // });
}

const add_luis_triggers = function(bot): any {
    bot.recognizer(new LuisRecognizer(process.env.LUIS_ENDPOINT as string));

    bot.dialog("GetCustomerAddress", [
        // Waterfal dialog
        ExtractCustomerEntity,
        FindCustomerInNAV
    ])
    .triggerAction({
        matches: 'GetCustomerAddress'
    })

    return bot;
    
} 

export {
    add_luis_triggers
};