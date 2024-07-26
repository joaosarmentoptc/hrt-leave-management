const moment = require("moment");
const uuid = require("uuid");
const userRepository = require("../employee/repository");
const leaveRepository = require("./repository");
const { LEAVE_REQUEST_STATUS } = require("../../../configs/enum");

async function requestAlreadyExists(userId, dates) {
  return (await leaveRepository.findByPkAndDate(userId, dates)).length > 0;
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
    const startDate = moment(requestData.start_date, "YYYY-MM-DD");
    const endDate = moment(requestData.end_date, "YYYY-MM-DD");
    const numberOfDays = endDate.diff(startDate, "days") + 1;
    const requestId = uuid.v7();

    const listOfDays = [];

    for (let i = 0; i < numberOfDays; i += 1) {
      const currentDate = moment(requestData.start_date)
        .add(i, "days")
        .format("YYYY-MM-DD");
      listOfDays.push({
        ...requestData,
        user_id: userId,
        start_date: currentDate,
        status: LEAVE_REQUEST_STATUS.pending,
        request_id: requestId,
      });
    }

    const dates = listOfDays.map((request) => request.start_date);

    const alreadyBooked = await requestAlreadyExists(userId, dates);
    if (alreadyBooked) {
      return null;
    }
    return leaveRepository.createBulkRequest(listOfDays);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function approveOrRejectRequest(approverId, requestId, newStatus) {
  const leaveRequest = await leaveRepository.findByUuid(requestId);
  const canUpdate = await userRepository.isManager(
    leaveRequest[0].user_id,
    approverId
  );
  if (!canUpdate) return null;

  const updated = await leaveRepository.findByPkAndChangeStatus(
    requestId,
    newStatus
  );
  return updated;
}

module.exports = {
  getUserAndSubordinatesLeaves,
  createNewRequest,
  approveOrRejectRequest,
};
