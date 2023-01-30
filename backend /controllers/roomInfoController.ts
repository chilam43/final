import { RoomInfoService } from "../services/roomInfoServices";

export class RommInfoController {
  constructor(private roomInfoService: RoomInfoService) {}

  public getRoomInfo = async (req: any, res: any) => {
    try {
      let result = await this.roomInfoService.getRoomInfo();
      console.log("controller room info", result);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal_server error" });
    }
  };
}
