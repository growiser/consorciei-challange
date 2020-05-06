function setPermission(source, allowed) {

    // Verify if user contain the necessery permissions ID's 
    const isAllowed = source.permissions.some(permission=> allowed.includes(permission))
    console.log('isALlowed', isAllowed)

    if(isAllowed) {
        // Generating Allowed Policy
        source.callback(null, source.generatePolicy('user', 'Allow', source.arn))
        return true
    } else {
        // Generating Denied Policy
        source.callback(null, source.generatePolicy('user', 'Deny', source.arn))
    }
}

module.exports = {
    setPermission: setPermission
}