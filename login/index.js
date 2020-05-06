'use strict'

const hlprLogin = require("./helpers/login")
const hlprValidation = require("./helpers/validation")

exports.handler = async (event, context, callback) => {
    try {

        const { username, password } = event.body

        // Validating body fields
        const isValid = await hlprValidation.validation(event.bdoy)

        // Checking integrity of data and Sigin with JWT
        const loggedUser = await hlprLogin.login({ username, password })

        let successResult = {
            success: true,
            status_code: 200,
            user: loggedUser
        }
        
        return successResult
    } catch (error) {
        let errorResult = {
            success: false,
            status_code: 500,
            error: error.type,
            message: error.message
        }
        
        console.log(errorResult)
        return errorResult
    }
  
}