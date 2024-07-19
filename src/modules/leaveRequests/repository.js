const { LeaveRequest, Sequelize } = require("../../../models");
const { LEAVE_REQUEST_STATUS } = require("../../../configs/enum");

function create(userId, leaveData) {
  return LeaveRequest.create({
    user_id: userId,
    leave_type: leaveData.leave_type,
    start_date: leaveData.start_date,
    end_date: leaveData.end_date,
    period: leaveData.period,
    reason: leaveData.reason,
    status: LEAVE_REQUEST_STATUS.pending,
  });
}

function findByPkAndDate(userId, date) {
  return LeaveRequest.findOne({
    where: {
      [Sequelize.Op.and]: [
        { user_id: userId },

        Sequelize.where(
          Sequelize.fn("DATE", Sequelize.col("start_date")),
          date
        ),
      ],
    },
  });
}

function findByPk(leaveRequestId) {
  return LeaveRequest.findByPk(leaveRequestId);
}

function findByPkAndChangeStatus(leaveRequest, status) {
  return leaveRequest.update({ status });
}

module.exports = { create, findByPkAndDate, findByPk, findByPkAndChangeStatus };
