import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("room_number_status", (table) => {
    table.increments();
    table.integer("room_number");
    table.integer("room_type_id");
    table.foreign("room_type_id").references("room_type.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("room_number_status");
}

// INSERT INTO room_number_status (room_number,room_type_id)
// VALUES(101,1),(201,2),(202,2),
// (301,3),(302,3),(303,3),
// (401,4),(402,4),(403,4),(404,4);

//SELECT room_type ,room_number, FROM room_type JOIN room_number_status ON room_id = room_type.id GROUP BY (room_type,room_number);

//SELECT room_type,picture ,room_number,price,content FROM room_type JOIN room_number_status ON room_id = room_type.id;
