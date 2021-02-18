import { Authenticator } from "./../services/Authenticator";
import { FriendBusiness } from "./../business/FriendBusiness";
import { Request, Response } from "express";

export class FriendController {
  async makeFriend(request: Request, response: Response) {
    const friendBusiness: FriendBusiness = new FriendBusiness();
    const token: string = request.headers.authorization!;
    const { user_to_add_id } = request.body;
    const authenticator: Authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token);

    await friendBusiness.makeFriend(authenticatorData.id, user_to_add_id);

    response.status(200).send({ sucess: true });
    try {
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }

  async undoFriendship(request: Request, response: Response) {
    try {
      const friendBusiness: FriendBusiness = new FriendBusiness();
      const token: string = request.headers.authorization!;
      const { user_to_del_id } = request.body;
      const authenticator: Authenticator = new Authenticator();
      const authenticatorData = authenticator.getData(token);

      await friendBusiness.undoFriendship(authenticatorData.id, user_to_del_id);

      response.status(200).send({ sucess: true });
    } catch (error) {
      response.status(400).send({ error: error.message });
    }
  }
}
