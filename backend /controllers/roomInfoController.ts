import { form } from "../Routes/uploadFileRoute";
import { Bearer } from "permit";
import { RoomInfoService } from "../services/roomInfoServices";
import { JWTpayload } from "../guard";
import jwt from "../jwt";
import jwtSimple from "jwt-simple";

export class RommInfoController {
  constructor(private roomInfoService: RoomInfoService) {}

  public getRoomInfo = async (req: any, res: any) => {
    try {
      let result = await this.roomInfoService.getRoomInfo();
      // console.log("controller room info", result);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal_server error" });
    }
  };
  public setRoomInfo = async (req: any, res: any) => {
    try {
      form.parse(req, async (err: any, fields: any, files: any) => {
        console.log({ req, err, fields, files });

        let result = await this.roomInfoService.setRoomInfo(fields, files);

        // );
        // console.log("controller set room info", result);
        // res.json({});

        return res.status(200).json({ result });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal_server error" });
    }
  };
  public bookingRoom = async (req: any, res: any) => {
    try {
      let result = await this.roomInfoService.bookingRoom(req);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal_server error" });
    }
  };
}
