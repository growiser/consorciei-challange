'use strict'

const hlprSignup = require("./helpers/signup")
const hlprValidation = require("./helpers/validation")
const hlprAccessGroups = require("./helpers/sign_access_groups")

exports.handler = async (event, context, callback) => {
   try {

        // Validating body fields
        await hlprValidation.validation(event)

        // Creating new User
        const createdUserId = await hlprSignup.signup({
            username: event.username, 
            password: event.password, 
        })
        
        // Inserting user permissions (By an array of Access Groups ID's)
        await hlprAccessGroups.signAccessGroups(event.access_ids, createdUserId)

        callback(null, "User and permissions successfully created")

   } catch(error){
       throw new Error(error)
   }
}