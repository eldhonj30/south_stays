import jwt from "jsonwebtoken";

const generateToken = (res, email, id) => {
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 100,
  });
};

export default generateToken;
