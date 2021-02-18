import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  tableName: string = "UsersLabook6";

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
        .where({ email });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public createUser = async (
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<any> => {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(this.tableName);
  };
}
