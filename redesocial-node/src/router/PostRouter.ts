import { PostController } from './../controller/PostController';
import express from "express";
import { feed } from "../controller/FeedController";

export const PostRouter = express.Router();

PostRouter.post("/", new PostController().create);
PostRouter.get("/feed", feed );
PostRouter.put("/:post_id/like", new PostController().like);
PostRouter.put("/:post_id/dislike", new PostController().dislike);