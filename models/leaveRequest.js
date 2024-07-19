module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define(
    "leave_requests",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      leave_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: { type: DataTypes.DATE, allowNull: false },
      end_date: { type: DataTypes.DATE, allowNull: false },
      period: { type: DataTypes.STRING, allowNull: false },
      reason: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING, allowNull: false, default: "Pending" },
    },
    {}
  );

  LeaveRequest.associate = (models) => {
    LeaveRequest.belongsTo(models.User, {
      foreignKey: "user_id",
      otherKey: "id",
    });
  };

  return LeaveRequest;
};
