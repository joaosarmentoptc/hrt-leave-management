const moment = require("moment");
const balanceRepository = require("./repository");

async function getBalanceForUser(userId) {
  const currentYear = moment().format("YYYY");
  const balances = (await balanceRepository.findByUserId(userId)).filter(
    (balance) => balance.year === currentYear
  );
  return balances;
}

module.exports = { getBalanceForUser };
