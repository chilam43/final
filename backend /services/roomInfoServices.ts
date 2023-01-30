import { Knex } from "knex";
export class RoomInfoService {
  constructor(private knex: Knex) {}

  public getRoomInfo = async () => {
    let result = await this.knex.raw(
      `SELECT id,room_type ,picture,price,content FROM room_type`
    );
    // console.log("service room info", result.rows[0]);

    return result.rows;
  };
}
