import { Knex } from "knex";
export class RoomInfoService {
  constructor(private knex: Knex) {}

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
  public searchAvailableRoom = async (req: any) => {
    let inin = new Date(req.body.checkInDate);
    let outout = new Date(req.body.checkOutDate);
    let checkIn = inin.toDateString();
    let checkOut = outout.toDateString();
    // console.log(checkIn, checkOut);

    let data = await this.knex.raw(
      `SELECT room_number_status.*
    FROM room_number_status
    WHERE id NOT IN (
        SELECT room_number_status.id
        FROM booking_record
        JOIN room_number_status on booking_record.room_id = room_number_status.id
        WHERE NOT (
            check_in_date::date >= ?::date
            OR check_out_date::date <= ?::date
        )
        AND payment_time is NULL
        AND (
          now()::timestamp < lock_time::timestamp
          AND payment_time is NULL
          AND cancel_time is NULL
        )

        UNION
        SELECT room_number_status.id
        FROM booking_record
        JOIN room_number_status on booking_record.room_id = room_number_status.id
        WHERE payment_time is NOT NULL
        AND (
            check_in_date::date >= ?::date
            OR check_out_date::date <= ?::date
        )
         AND cancel_time is NOT NULL
    )`,
      [checkIn, checkOut, checkIn, checkOut]
    );

    // console.log("room id available", data.rows);

    const room_id_list: any[] = Array.from(
      new Set(data.rows.map((v: any) => v.room_type_id))
    );

    let roomAvailable = await this.knex
      .select("*")
      .from("room_type")
      .whereIn("id", room_id_list);

    return roomAvailable;
  };
}
