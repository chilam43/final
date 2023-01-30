import jwt from "./jwt";
import jwtSimple from "jwt-simple";
import express from "express";

import { Bearer } from "permit";

import { User } from "./main";
import { userService } from "./Routes/userRoute";

const permit = new Bearer({
  query: "access_token",
});
export type JWTpayload = {
  id: number;
};
export async function isLoggedIn(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);
    if (!token) {
      return res.status(401).json({ msg: "Missing jwt token" });
    }

    const payload: JWTpayload = jwtSimple.decode(token, jwt.jwtSecret);
    // Querying Database is not compulsory
    const user: User = await userService.getUser(payload.id);
    if (user) {
      req.user = user;
      return next();
    } else {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied" });
  }
}
