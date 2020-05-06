'use strict'

const hlprToken = require("./helpers/token")
const hlprRoute = require("./helpers/route")
const hlprPermission = require("./helpers/permission")

exports.handler = async (event, context, callback) => {
    if(!event.methodArn) {
       throw new Error('No Arn method founded');       
    }

    // Validations and helpers
    const route = await hlprRoute.getDestination(event.methodArn)
    const method = await hlprRoute.getMethod(event.methodArn)
    const tokenData = await hlprToken.validateToken(event.authorizationToken)

    // Setting permissions if Token is valid
    if(tokenData.success) {
        const permissions = JSON.parse(tokenData.data.access_group_id)
        const sourceData = { route, method, permissions, arn: event.methodArn, callback, generatePolicy }

        // Verifying if the user have the permission group necessary and generating policy 
        hlprPermission.setPermission(sourceData, "POST", "user", [1]) // Example for "user create"
        
        return callback(null, { tokenData } );
        
    } else {
        throw new Error('Authentication Failed. Verify if your authorization token is valid');
    }
};


var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    return authResponse;
}