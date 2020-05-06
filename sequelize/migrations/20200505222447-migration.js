'use strict';

module.exports = {
  up: async  (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('access_groups', { 
      id_access_group: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
      },
      static_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },   
      group_name: Sequelize.STRING
    })

    await queryInterface.createTable('user_profile', { 
      id_user_profile: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: Sequelize.STRING,
      hashed_password: Sequelize.STRING
    })
  
    await queryInterface.createTable('user_current_groups', { 
      id_current_groups: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_access_group: {
        type: Sequelize.INTEGER,
        references: {
          model: "access_groups",
          key: "id_access_group"
        }
      },
      id_user_profile: {
        type: Sequelize.INTEGER,
        references: {
          model: "user_profile",
          key: "id_user_profile"
        }
      },
    });
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("access_groups");
  }
};
