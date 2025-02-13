import jwt from "jsonwebtoken";
import Token from "../../models/token";

const JWT_SECRET = process.env.JWT_SECRET;

export const createToken = async (id: number) => {
  if (JWT_SECRET) {
    const token = jwt.sign(
      {
        id,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    // Calculate the expiry date/time
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1); // JWT_EXPIRY is "1d"

    // Store the token and its expiry in the database
    const data = await Token.create({
      userId: id,
      token,
      expiry,
    });
    // Return the token
    return token;
  } else {
    return null;
  }
};
