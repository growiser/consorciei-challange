"use strict";

module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      id_post: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_user: {
        type: DataTypes.INTEGER,
        references: {
          model: "user_profile",
          key: "id_user"
        }
      },
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      content: DataTypes.STRING,
      image_url: DataTypes.STRING,
      created_at: DataTypes.DATE
    },
    { force: false }
  );
  post.associate = function(models) {
    
    // User Relationship
    post.hasMany(models.user_profile, {
      foreignKey: "id_user"
    });
  };
  return post;
};