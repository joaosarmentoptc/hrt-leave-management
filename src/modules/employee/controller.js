module.exports = {
  index(req, res, next) {
    try {
      return res.status(200).json({ data: "Employee_details" });
    } catch (error) {
      return next(error);
    }
  },
};
