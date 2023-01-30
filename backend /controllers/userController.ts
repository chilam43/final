import { UserService } from "../services/userServices";
import jwt from "../jwt";
import jwtSimple from "jwt-simple";

export class UserController {
  constructor(private userService: UserService) {}

  createMember = async (req: any, res: any) => {
    // console.log("register result from controller", req.body);
    try {
      res = await this.userService.registerMember(req.body);

      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal_server error" });
    }
  };
  login = async (req: any, res: any) => {
    try {
      // console.log("controller----------- ", req.body.email);

      let result = await this.userService.login(req.body);
      console.log("controller user ", result);

      if (result.length == 0) {
        return res.status(500).json({ status: "wrong username" });
      } else {
        if (result[0].password == req.body.password) {
          const payload = {
            id: result[0].id,
            email: result[0].email,
            level: result[0].level,
          };

          const token = jwtSimple.encode(payload, jwt.jwtSecret);
          console.log(token);

          return res.json({
            token: token,
            result: result[0].level,
          });
        } else {
          return res.status(500).json({ status: "wrong password" });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "internal_server error" });
    }
  };
}
