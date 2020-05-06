"use strict";

module.exports = (sequelize, DataTypes) => {
  const user_profile = sequelize.define(
    "user_profile",
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usename: DataTypes.STRING,
      hashed_password: DataTypes.STRING
    },
    { force: false }
  );
  user_profile.associate = function(models) {
  };
  
  return user_profile;
};