import { CreatePostDatabase } from "./../data/CreatePostsDatabase";
import { ReactionsDatabase } from "./../data/ReactionsDatabase";

export class ReactionsBusiness {
  private reactionsDatabase: ReactionsDatabase = new ReactionsDatabase();
  private postsDatabase: CreatePostDatabase = new CreatePostDatabase();

  async like(post_id: string, user_like_id: string): Promise<any> {
    const isLiked: boolean = await this.reactionsDatabase.isLiked(
      post_id,
      user_like_id
    );

    if (isLiked) {
      throw new Error("This post is already liked.");
    }

    await this.reactionsDatabase.like(post_id, user_like_id);
  }

  async dislike(post_id: string, user_like_id: string): Promise<any> {
    const postExists = await this.postsDatabase.getPostById(post_id);

    if (!postExists) {
      throw new Error("This post does not exist.");
    }

    const isLiked: boolean = await this.reactionsDatabase.isLiked(
      post_id,
      user_like_id
    );

    if (!isLiked) {
      throw new Error("This post isn't liked yet.");
    }

    await this.reactionsDatabase.dislike(post_id, user_like_id);
  }
}
