const bcrypt = require('bcryptjs');
const Sequelize = require("../database/config.js")
const { QueryTypes } = Sequelize

async function signup(user) {
   try {

    // Hashing Passowrd and re-setting at user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Insert query
    const createdUser = await Sequelize.query(
        "INSERT INTO consorciei.user_profile (username, hashed_password) values (:username, :password)",
        {   
            replacements: { username: user.username, password: user.password },
            type: QueryTypes.INSERT,
        }
    );

    // Checking if user has been successfully created
    if (!createdUser[1] == 1) {
        throw new Error("Error at user insertion");
    }

    return createdUser[0]
   } catch(error){
        throw new Error(error.message)
   }
}

module.exports = {
    signup: signup
}