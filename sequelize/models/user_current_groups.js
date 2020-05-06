"use strict";

module.exports = (sequelize, DataTypes) => {
  const user_current_groups = sequelize.define(
    "user_current_groups",
    {
      id_access_group: {
        type: DataTypes.INTEGER,
        references: {
          model: "access_groups",
          key: "id_access_group"
        }
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_profile",
          key: "id_user"
        }
      },
      
    },
    { force: false }
  );
  user_current_groups.associate = function(models) {

    // Access Group Relationship
    user_current_groups.hasMany(models.access_groups, {
      foreignKey: "id_access_group"
    });

    // User Relationship
    user_current_groups.hasMany(models.user_profile, {
        foreignKey: "id_user"
    });
  };

  return user_current_groups;
};