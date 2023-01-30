import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("room_type", (table) => {
    table.increments();
    table.string("room_type");
    table.string("picture");
    table.integer("price");
    table.string("content");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("room_type");
}

// INSERT INTO room_type (room_type,price,content)
// VALUES ('A',400,'Room A content'),('B',300,'Room B content'),('C',200,'Room C content'),('D',100,'Room D content');
