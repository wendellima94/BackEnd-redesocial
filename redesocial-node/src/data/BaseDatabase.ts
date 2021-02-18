import knex from "knex";
import Knex from "knex";

export abstract class BaseDatabase {
  static destroyConnection() {
      throw new Error("Method not implemented.");
  }
  
  private static connection: Knex;

  public getConnection(): Knex {
    if (!BaseDatabase.connection) {
      BaseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
        },
      });
    }
    return BaseDatabase.connection;
  }

  public async destroyConnection(): Promise<void> {
    await BaseDatabase.connection.destroy();
  }
}