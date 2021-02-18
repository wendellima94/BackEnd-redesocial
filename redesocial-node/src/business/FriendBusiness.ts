import { FriendDatabase } from "../data/FriendDatabase";

export class FriendBusiness {
  private friendDatabase: FriendDatabase = new FriendDatabase();

  public async makeFriend(
    user_id: string,
    user_to_add_id: string
  ): Promise<any> {
    await this.friendDatabase.makeFriend(user_id, user_to_add_id);
  }

  public async undoFriendship(
    user_id: string,
    user_to_del_id: string
  ): Promise<any> {
    await this.friendDatabase.undoFriendship(user_id, user_to_del_id);
  }
}
