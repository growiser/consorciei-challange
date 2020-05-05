function getDestination(sourceDestination) {
    var route = sourceDestination
    route = route.substring(route.indexOf("/dev/") + 1).split('/', 4);
    if(route[3]) { route = route[2] + '/' + route[3] } else { route = route[2] }

    return route
}

function getMethod(sourceMethod) {
    var method = sourceMethod
    method = method.substring(method.indexOf("/dev/") + 1).split('/', 4);
    return method[1]
}

module.exports = {
    getDestination: getDestination,
    getMethod: getMethod
}