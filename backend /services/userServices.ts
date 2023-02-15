import { Knex } from "knex";

export class UserService {
  constructor(private knex: Knex) {}

  public registerMember = async (body: any) => {
    console.log("create member from service", body);

    await this.knex
      .insert({
        name: body.name,
        email: body.email,
        password: body.password,
        level: 1,
      })
      .into("register")
      .returning("id");
  };
  public login = async (body: any) => {
    console.log("service login ", body);

    let result = await this.knex
      .select()
      .from("register")
      .where("email", body.email);
    console.log("service", result.length);
    return result;
  };
  public getUser = async (id: number) => {
    let result = await this.knex.select().from("register").where("id", id);
    return result[0];
  };
}
