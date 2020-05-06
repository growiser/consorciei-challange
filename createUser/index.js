'use strict'

const hlprSignup = require("./helpers/signup")
const hlprValidation = require("./helpers/validation")
const hlprAccessGroups = require("./helpers/sign_access_groups")

exports.handler = async (event, context, callback) => {
   try {

        const { body } = event

        // Validating body fields
        await hlprValidation.validation(body)

        // Creating new User
        const createdUserId = await hlprSignup.signup({
            username: body.username, 
            password: body.password, 
        })
        
        // Inserting user permissions (By an array of Access Groups ID's)
        await hlprAccessGroups.signAccessGroups(body.access_ids, createdUserId)

        callback(null, "User and permissions successfully created")

   } catch(error){
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