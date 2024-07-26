const { LeaveBalance } = require("../../../models");

function findByUserId(userId) {
  return LeaveBalance.findAll({ where: { user_id: userId } });
}

module.exports = {
  findByUserId,
};
