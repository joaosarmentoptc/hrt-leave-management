const { LeaveRequest } = require("../../../models");

function createBulkRequest(leaveData) {
  return LeaveRequest.bulkCreate(leaveData);
}

function findByPkAndDate(userId, dates) {
  return LeaveRequest.findAll({
    where: {
      user_id: userId,
      start_date: dates,
    },
  });
}

function findByUuid(leaveRequestUuid) {
  return LeaveRequest.findAll({ where: { request_id: leaveRequestUuid } });
}

function findByPkAndChangeStatus(requestId, status) {
  return LeaveRequest.update({ status }, { where: { request_id: requestId } });
}

module.exports = {
  createBulkRequest,
  findByPkAndDate,
  findByUuid,
  findByPkAndChangeStatus,
};
