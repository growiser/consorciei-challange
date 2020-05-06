const Sequelize = require("../database/config.js")
const { QueryTypes } = Sequelize

async function signAccessGroups(access_groups, user_id) {
   try {

    // Iterating access group array and inserting data
    for (id_access_group of access_groups) {
        // Insert query
        await Sequelize.query(
            "INSERT INTO consorciei.user_current_groups (id_access_group, id_user_profile) values (:id_access_group, :user_id)",
            {   
                replacements: { id_access_group,  user_id },
                type: QueryTypes.INSERT,
            }
        );
    }
    
   } catch(error){
        throw new Error(error.message)
   }
}

module.exports = {
    signAccessGroups: signAccessGroups
}