'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    

    return queryInterface.bulkInsert('access_groups', [ 
      {
        static_id: 3,
        group_name: "Content curator"
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('access_groups', null, {});
  }
};
