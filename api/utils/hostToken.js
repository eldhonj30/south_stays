import jwt from "jsonwebtoken";

const hostToken = (res, email, id) => {
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("host", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 100,
  });
};

export default hostToken;
