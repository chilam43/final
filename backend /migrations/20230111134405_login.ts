import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("login", (table) => {
    table.increments();
    table.string("email");
    table.string("password");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("login");
}
