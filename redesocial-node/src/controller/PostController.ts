import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CreatePostDatabase } from "../data/CreatePostsDatabase";
import moment from "moment";
import { ReactionsBusiness } from "../business/ReactionsBusiness";

export class PostController {
  async create(req: Request, res: Response) {
    try {
      const authenticator = new Authenticator();
      const tokenData = authenticator.getData(req.headers.authorization!);

      if (!req.body.photo || !req.body.description || !req.body.type) {
        throw new Error("Invalid");
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      const today = moment().format("YYYY-MM-DD");
      const postData = {
        photo: req.body.photo,
        description: req.body.description,
        type: req.body.type,
      };

      const postDb = new CreatePostDatabase();
      await postDb.createPosts(
        id,
        postData.photo,
        postData.description,
        today,
        postData.type,
        tokenData.id
      );

      res.status(200).send({
        message: "Post Criado",
      });
    } catch (err) {
      res.status(400).send({
        mesage: err.message,
      });
    }
  }

  async like(request: Request, response: Response) {
    try {
      const { post_id } = request.params;
      const reactionsBusiness: ReactionsBusiness = new ReactionsBusiness();
      const token: string = request.headers.authorization!;
      const authenticator: Authenticator = new Authenticator();
      const authenticatorData = authenticator.getData(token);

      await reactionsBusiness.like(post_id, authenticatorData.id);

      response.status(200).send({ sucess: true });
    } catch (error) {
      response.status(error.status || 400).send({
        message: error.message,
      });
    }
  }

  async dislike(request: Request, response: Response) {
    try {
      const { post_id } = request.params;
      const reactionsBusiness: ReactionsBusiness = new ReactionsBusiness();
      const token: string = request.headers.authorization!;
      const authenticator: Authenticator = new Authenticator();
      const authenticatorData = authenticator.getData(token);

      await reactionsBusiness.dislike(post_id, authenticatorData.id);

      response.status(200).send({ sucess: true });
    } catch (error) {
      response.status(error.status || 400).send({
        message: error.message,
      });
    }
  }
}
