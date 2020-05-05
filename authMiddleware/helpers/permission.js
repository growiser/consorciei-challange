function setPermission(source, method, route, allowed) {
    // Verify if user contain the necessery permissions ID's 
    const isAllowed = source.permissions.some(permission=> allowed.includes(permission))
    console.log('isALlowed', isAllowed)
    
    // Verify if we don't change anything
    if(source.route === route && source.method === method) {
        if(isAllowed) {
            // Generating Allowed Policy
            source.callback(null, source.generatePolicy('user', 'Allow', source.arn))
            return true
        } else {
            // Generating Denied Policy
            source.callback(null, source.generatePolicy('user', 'Deny', source.arn))
        }
    } else {
        return false;
    }
}

module.exports = {
    setPermission: setPermission
}