module.exports = (sequelize, DataTypes) => {
  const UserManager = sequelize.define(
    "user_manager",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      manager_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {}
  );

  UserManager.associate = (models) => {
    UserManager.belongsTo(models.User, { as: "user", foreignKey: "user_id" });
    UserManager.belongsTo(models.User, {
      as: "managers",
      foreignKey: "manager_id",
    });
  };
  return UserManager;
};
