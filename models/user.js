module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        default: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
    }
  );

  User.associate = (models) => {
    User.belongsToMany(models.User, {
      through: models.UserManager,
      as: "managers",
      foreignKey: "user_id",
      otherKey: "manager_id",
    });
    User.belongsToMany(models.User, {
      through: models.UserManager,
      as: "subordinates",
      foreignKey: "manager_id",
      otherKey: "user_id",
    });
    User.hasMany(models.LeaveRequest, {
      as: "leaves",
      foreignKey: "user_id",
    });
  };

  return User;
};
