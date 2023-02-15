import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("booking_record", (table) => {
    table.increments();
    table.integer("user_id");
    table.foreign("user_id").references("register.id");
    table.integer("room_id");
    table.foreign("room_id").references("room_type.id");
    table.dateTime("check_in_date");
    table.dateTime("check_out_date");
    table.dateTime("lock_time");
    table.dateTime("payment_time");
    table.dateTime("confirm_time");
    table.dateTime("cancel_time");
    table.integer("ref_number");
    table.integer("final_price");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("booking_record");
}
