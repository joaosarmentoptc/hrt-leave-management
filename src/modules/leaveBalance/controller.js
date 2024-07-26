const service = require("./service");
const { BALANCE_NOT_FOUND } = require("../../../configs/errors");

module.exports = {
  async index(req, res, next) {
    try {
      const balance = await service.getBalanceForUser(req.userId);
      if (!balance.length > 0) {
        return res.status(404).json({ error: BALANCE_NOT_FOUND });
      }
      return res.status(200).json({ balance });
    } catch (error) {
      return next(error);
    }
  },
};
