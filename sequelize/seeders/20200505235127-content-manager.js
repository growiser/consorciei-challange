'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

    return queryInterface.bulkInsert('access_groups', [
      {
        static_id: 2,
        group_name: "Content manager"
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  }
};
