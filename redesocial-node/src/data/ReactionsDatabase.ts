import { BaseDatabase } from "./BaseDatabase";

export class ReactionsDatabase extends BaseDatabase {
  tableName: string = "LabookLikeDislike";

  public isLiked = async (
    post_id: string,
    user_like_id: string
  ): Promise<boolean> => {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(this.tableName)
        .where({ post_id: post_id, user_like_id: user_like_id });
      if (result.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public like = async (post_id: string, user_like_id: string): Promise<any> => {
    try {
      await this.getConnection()
        .insert({ post_id, user_like_id })
        .into(this.tableName);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public dislike = async (
    post_id: string,
    user_like_id: string
  ): Promise<any> => {
    try {
      await this.getConnection()
        .delete()
        .from(this.tableName)
        .where({ post_id: post_id, user_like_id: user_like_id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
