module.exports = (sequelize, DataTypes) => {
  const LeaveBalance = sequelize.define(
    "leave_balances",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leave_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
    },
    {}
  );

  LeaveBalance.associate = (models) => {
    LeaveBalance.belongsTo(models.User, {
      foreignKey: "user_id",
      otherKey: "id",
    });
  };

  return LeaveBalance;
};
