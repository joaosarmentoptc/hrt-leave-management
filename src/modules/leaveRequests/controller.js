const joi = require("joi").extend(require("@joi/date"));
const service = require("./service");
const { LEAVE_TYPES, LEAVE_PERIODS } = require("../../../configs/enum");

const {
  USER_NOT_AUTHENTICATED,
  LEAVE_ALREADY_BOOKED,
  END_DATE_AFTER_START_DATE,
  CANNOT_APPROVE_OR_REJECT_LEAVE_REQUEST,
  INVALID_REQUEST,
} = require("../../../configs/errors");

const leaveRequestSchema = joi.object({
  leave_type: joi.string().valid(...Object.keys(LEAVE_TYPES)),
  start_date: joi.date().utc().format("YYYY-MM-DD").required(),
  end_date: joi
    .date()
    .utc()
    .format("YYYY-MM-DD")
    .required()
    .custom((value, helpers) => {
      // eslint-disable-next-line camelcase
      const { start_date } = helpers.state.ancestors[0];
      if (new Date(value) < new Date(start_date)) {
        return helpers.message(END_DATE_AFTER_START_DATE);
      }
      return value;
    }),
  reason: joi.string(),
  period: joi
    .string()
    .valid(...Object.keys(LEAVE_PERIODS))
    .required(),
});

module.exports = {
  async index(req, res, next) {
    try {
      const result = await service.getUserAndSubordinatesLeaves(req.userId);
      if (!result) {
        return res.status(404).json({ error: "Not found" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  async leaveRequest(req, res, next) {
    try {
      const validated = await leaveRequestSchema.validateAsync(req.body);
      if (!req.userId) {
        return res.status(401).json({ error: USER_NOT_AUTHENTICATED });
      }
      const created = await service.createNewRequest(req.userId, validated);
      if (!created) {
        return res.status(400).json({ error: LEAVE_ALREADY_BOOKED });
      }
      return res.status(201).json(created);
    } catch (error) {
      console.error(error);
      error.status = 400;
      return next(error);
    }
  },

  async approveOrReject(req, res, next) {
    try {
      const { requestId } = req.params;
      if (!requestId) {
        return res.status(400).json({ error: INVALID_REQUEST });
      }
      if (!req.userId) {
        return res.status(401).json({ error: USER_NOT_AUTHENTICATED });
      }
      const updated = await service.approveOrRejectRequest(
        req.userId,
        requestId,
        req.newStatus
      );
      if (!updated)
        return res
          .status(403)
          .json({ error: CANNOT_APPROVE_OR_REJECT_LEAVE_REQUEST });
      return res.status(200).json({ updated });
    } catch (error) {
      console.error(error);
      error.status = 400;
      return next(error);
    }
  },
};
