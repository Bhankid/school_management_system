import { NextApiRequest, NextApiResponse } from "next";

const error = async (req: NextApiRequest, res: NextApiResponse) => {
  const error = req.query.error;

  if (error === "CredentialsSigninPasswordError") {
    return res.status(401).json({ error: "Invalid password" });
  } else if (error === "CredentialsSigninEmailError") {
    return res.status(401).json({ error: "Invalid email" });
  } else {
    return res.status(401).json({ error: "Authentication failed" });
  }
};

export default error;