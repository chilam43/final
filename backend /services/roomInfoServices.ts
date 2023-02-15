import { Knex } from "knex";
export class RoomInfoService {
  constructor(private knex: Knex) {}

  public getRoomInfo = async () => {
    let result = await this.knex.raw(
      `SELECT id,room_type ,picture,price,content FROM room_type ORDER BY id ASC`
    );
    // console.log("service room info", result.rows[0]);

    return result.rows;
  };

  public setRoomInfo = async (fields: any, files?: any) => {
    let result = await this.knex
      .select()
      .from("room_type")
      .where("id", fields.id);

    const picturefile = files?.file;
    // console.log("-------", picturefile.newFilename);
    // console.log("******", fields);

    if (
      fields.price &&
      result[0].price != fields.price &&
      fields.content &&
      result[0].content != fields.content
    ) {
      await this.knex
        .update({ price: +fields.price, content: fields.content })
        .where("id", fields.id)
        .from("room_type");
    } else if (fields.price && result[0].price != fields.price) {
      await this.knex
        .update("price", +fields.price)
        .where("id", fields.id)
        .from("room_type");
    } else if (fields.content && result[0].content != fields.content) {
      await this.knex
        .update("content", fields.content)
        .where("id", fields.id)
        .from("room_type");
    } else if (
      picturefile != undefined &&
      result[0].picture != picturefile.newFilename
    ) {
      await this.knex
        .update("picture", picturefile.newFilename)
        .where("id", fields.id)
        .from("room_type");
    }
  };
  public bookingRoom = async (req: any) => {
    let resutl = await this.knex.insert({});
  };
}
