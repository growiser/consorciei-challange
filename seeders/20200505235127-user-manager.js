'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    

    await queryInterface.bulkInsert('access_groups', [
      {
        static_id:1,
        group_name: "User manager"
      }], {});
  
    await queryInterface.bulkInsert('user_profile', [
      {
        username: "user-manager",
        hashed_password: "$2a$10$VyEgSdjJlNQ751wbqS9ut.GLJs1tW2ckj8y/l557a9/LMOSXk5JD6"
      }], {});

      await queryInterface.bulkInsert('user_current_groups', [
        {
          id_user_profile: 1, // Will be the first user of the DB
          id_access_group: 1 
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  }
};
