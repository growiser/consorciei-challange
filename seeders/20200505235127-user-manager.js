'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

    return queryInterface.bulkInsert('access_groups', [
      {
        static_id:1,
        group_name: "User manager"
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  }
};
