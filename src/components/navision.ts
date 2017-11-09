import { 
    createClient,
    BasicAuthSecurity
} from 'soap';

const navAuth = "Basic " + new Buffer(
    process.env.NAV_USERNAME + ':' + process.env.NAV_PASSWORD
).toString("base64");

const authHeader = { 
    wsdl_headers: { 
        Authorization: navAuth
    } 
}

function makeSoapCall(session, customerName) {
    createClient(process.env.NAV_ENDPOINT as string, authHeader, (err, client: any) => {
        if (err) {
            console.log(err);
        } else {
            client.setSecurity(new BasicAuthSecurity(process.env.NAV_USERNAME as string, process.env.NAV_PASSWORD as string));
            client.GetCustomerAddress({customerNoOrName: customerName}, function(error, result) {
                if(error) {
                    session.send(error)
                } else {
                    session.send(result.return_value)
                }
            });
        }
    });
        
}

var findCustomer = function(session, data) {
    console.log(data.customerName);
    makeSoapCall(session, data.customerName);
}

export {
    findCustomer
}