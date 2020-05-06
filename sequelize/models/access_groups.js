"use strict";

module.exports = (sequelize, DataTypes) => {
  const access_groups = sequelize.define(
    "access_groups",
    {
      id_access_group: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false // We can define better the ID's
      },
      group_name: DataTypes.INTEGER
    },
    { force: false }
  );
  access_groups.associate = function(models) {
  };
  return access_groups;
};