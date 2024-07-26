const express = require("express");
const controller = require("./controller");
const { LEAVE_REQUEST_STATUS } = require("../../../configs/enum");

const router = express.Router();

router.route("/").get(controller.index);
router.route("/").post(controller.leaveRequest);
router.route("/:requestId/approve").patch((req, res, next) => {
  req.newStatus = LEAVE_REQUEST_STATUS.approved;
  next();
}, controller.approveOrReject);
router.route("/:requestId/reject").patch((req, res, next) => {
  req.newStatus = LEAVE_REQUEST_STATUS.rejected;
  next();
}, controller.approveOrReject);

module.exports = router;
