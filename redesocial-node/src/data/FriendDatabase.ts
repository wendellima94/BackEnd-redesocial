import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {
  tableName: string = "UserFriendLabook";

  public async makeFriend(
    user_id: string,
    user_to_add_id: string
  ): Promise<any> {
    try {
      await this.getConnection()
        .insert({ user_id, user_to_add_id })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async undoFriendship(
    user_id: string,
    user_to_del_id: string
  ): Promise<any> {
    try {
      await this.getConnection()
        .delete()
        .from(this.tableName)
        .where({ user_id: user_id, user_to_add_id: user_to_del_id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
