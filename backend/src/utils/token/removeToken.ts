import { Op } from "sequelize";
import Token from "../../models/token";

export const removeExpiredTokens = async () => {
  const now = new Date();
  await Token.destroy({ where: { expiry: { [Op.lt]: now } } });
};

// Run removeExpiredTokens every hour
setInterval(removeExpiredTokens, 60 * 60 * 1000);
