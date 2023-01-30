import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("register", (table) => {
    table.increments();
    table.string("name");
    table.string("email");
    table.string("password");
    table.integer("level");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("register");
}

// normal user
//INSERT INTO register (name,email,password,level) VALUES('alice','abc@a','abc',1);
//admin
////INSERT INTO register (name,email,password,level) VALUES('ben','abc@b','abc',2);
