const jwt = require("jsonwebtoken")

const authConfig = require("../config/auth")

function validateToken(token) {
    let result = {
        success: true,
        error: null,
        message: null,
        data: null
    }

    if(!token) {
        result.success = false
        result.error = "no_token"
        result.message = "You must provide a token."       
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) {
            result.success = false

            if(err.name === "TokenExpiredError") {
                result.error = "token_expired"
                result.message = "Token expired."
            }
    
            if(err.name === "JsonWebTokenError") {
                result.error = "invalid_token"
                result.message = "Token invalid."
            }
        }

        if(decoded) result.data = decoded
    })

    return result
}

module.exports = {
    validateToken: validateToken
}