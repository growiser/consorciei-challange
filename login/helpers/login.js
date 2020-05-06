const bcrypt = require('bcryptjs');
const Sequelize = require("../database/config.js")
const jwt = require("jsonwebtoken")
const { QueryTypes } = Sequelize


const authConfig = require("../config/auth")

async function login(data) {
    try {
        // Searching for existing user with same username
        const existingUser = await Sequelize.query(
            `SELECT * FROM consorciei.user_profile WHERE username=:username`,
            {   
                replacements: { username: data.username },
                type: QueryTypes.SELECT,
            }
        );

        if(!existingUser[0]) {
            throw new Error("Incorrect username or password")
        }

        // Comparing hashed password 
        const hashedPassword =  existingUser[0].hashed_password
        const passwordToCompare = data.password
        const isMatch = await bcrypt.compare(passwordToCompare, hashedPassword);
        if(!isMatch) {
            throw new Error("Incorrect username or password")
        }

        // Getting the user current access groups ID's
        const accessGroupsIds = await Sequelize.query(
            "SELECT id_access_group FROM consorciei.user_current_groups WHERE id_user_profile=:id_user",
            {   
                replacements: { id_user: existingUser[0].id_user_profile },
                type: QueryTypes.SELECT,
            }
        );

        const accessGroupsArray = await accessGroupsIds.map(accessGroup => {
            return accessGroup.id_access_group
        })

        // Prepare data to Sign with JWT
        var userData = {
            id: existingUser[0].id_user_profile,
            access_group_id: accessGroupsArray
        }

        // Signing and getting Token
        const token = await jwt.sign(userData , authConfig.secret, {
            expiresIn: 3600
        })
    
        userData.token = token
        return userData
    } catch(error){
        throw new Error(error)
    }
}

module.exports = {
    login: login
}