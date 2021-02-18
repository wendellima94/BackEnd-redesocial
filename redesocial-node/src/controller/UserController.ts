import { User } from "./../model/User";
import { UserBusiness } from "./../business/UserBusiness";
import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";

export class UserController {
  async signup(request: Request, response: Response) {
    try {
      if (!request.body.email || request.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
      }

      const userData = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
      };

      const idGenerator = new IdGenerator();
      const id = idGenerator.generate();
      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(userData.password);
      const userBusiness: UserBusiness = new UserBusiness();

      await userBusiness.createUser(
        id,
        userData.name,
        userData.email,
        hashPassword
      );

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id,
      });

      response.status(200).send({
        token,
      });
    } catch (err) {
      response.status(err.status || 400).send({
        message: err.message,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const userBusiness: UserBusiness = new UserBusiness();
      const user: User = await userBusiness.getUserByEmail(email);
      const hashManager: HashManager = new HashManager();
      const isPasswordCorrect: boolean = await hashManager.compare(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new Error("incorrect username or password");
      }

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({
        id: user.id,
      });

      res.status(200).send({
        message: "User successfully logged in",
        token,
      });
    } catch (err) {
      res.status(err.status || 400).send({
        message: err.message,
      });
    }
  }
}
