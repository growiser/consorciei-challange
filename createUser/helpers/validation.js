
const { validate } = require('indicative/validator')

const rules = {
    username: 'required|string',
    password: 'required|string'
}

const messages = {
    'username.required': 'is required.',
    'password.required': 'is required.',
    string: 'must be a string.',
  }
  
function validation(data) {
    return new Promise(async (resolve, reject) => {
        await validate(data, rules, messages)
        .then(() => {
            resolve(true)
        })
        .catch(error => {
            var field = error[0].field
            var message = error[0].message

            reject({
                type: 'validation_error',
                message: `The field ${field} ${message}` 
            })
        })
    })
}

module.exports = {
    validation: validation
}