export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  //TODO saber porque dá o erro user.getPassword is not a function e porque só funciona 
  //TODO com public
  

  // public getId(): string {
  //   return this.id;
  // }

  // public getName(): string {
  //   return this.name;
  // }

  // public getEmail(): string {
  //   return this.email;
  // }

  // public getPassword(): string {
  //   return this.password;
  // }
}
