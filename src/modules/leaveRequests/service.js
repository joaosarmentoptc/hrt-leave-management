const userRepository = require("../employee/repository");
const leaveRepository = require("./repository");

async function requestAlreadyExists(userId, startDate) {
  return leaveRepository.findByPkAndDate(userId, startDate);
}

async function getUserAndSubordinatesLeaves(userId) {
  try {
    const userWithSubordinates =
      await userRepository.findUserByIdWithSubordinatesAndLeaves(userId);

    if (!userWithSubordinates) return null;

    return userWithSubordinates;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createNewRequest(userId, requestData) {
  try {
    const startDate = new Date(requestData.start_date)
      .toISOString()
      .split("T")[0];

    const validate = await requestAlreadyExists(userId, startDate);
    if (validate) {
      return null;
    }
    return leaveRepository.create(userId, requestData);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function approveOrRejectRequest(approverId, requestId, newStatus) {
  const leaveRequest = await leaveRepository.findByPk(requestId);
  const canUpdate = await userRepository.isManager(
    leaveRequest.user_id,
    approverId
  );
  if (!canUpdate) return null;

  const updated = await leaveRepository.findByPkAndChangeStatus(
    leaveRequest,
    newStatus
  );
  return updated;
}

module.exports = {
  getUserAndSubordinatesLeaves,
  createNewRequest,
  approveOrRejectRequest,
};
