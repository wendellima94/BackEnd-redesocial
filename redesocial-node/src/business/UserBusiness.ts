import { UserDatabase } from "./../data/UserDatabase";
import { User } from "../model/User";

export class UserBusiness {
  private userDatabase: UserDatabase = new UserDatabase();

  async createUser(id: string, name: string, email: string, password: string) {
    await this.userDatabase.createUser(id, name, email, password);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User = await this.userDatabase.getUserByEmail(email);

    if (!user) {
      throw new Error("Usuário inexistente.");
    }

    return user;
  }
}
