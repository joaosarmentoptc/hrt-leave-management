const express = require("express");
const controller = require("./controller");
const { LEAVE_REQUEST_STATUS } = require("../../../configs/enum");

const router = express.Router();

/* GET catalog listing. */
router.route("/").get(controller.index);
router.route("/").post(controller.leaveRequest);
router.route("/:id/approve").patch((req, res, next) => {
  req.newStatus = LEAVE_REQUEST_STATUS.approved;
  next();
}, controller.approveOrReject);
router.route("/:id/reject").patch((req, res, next) => {
  req.newStatus = LEAVE_REQUEST_STATUS.rejected;
  next();
}, controller.approveOrReject);

module.exports = router;
