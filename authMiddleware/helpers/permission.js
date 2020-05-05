function setPermission(source, method, route, allowed) {
    const isAllowed = source.permissions.some(permission=> allowed.includes(permission))
    console.log('isALlowed', isAllowed)
    
    if(source.route === route && source.method === method) {
        if(isAllowed) {
            source.callback(null, source.generatePolicy('user', 'Allow', source.arn))
            return true
        } else {

            source.callback(null, source.generatePolicy('user', 'Deny', source.arn))
        }
    } else {
        return false;
    }
}

module.exports = {
    setPermission: setPermission
}