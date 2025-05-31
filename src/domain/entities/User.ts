import bcrypt from "bcrypt";

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;
  public readonly picture?: string | null;

  constructor(props: {
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    picture?: string | null;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.username = props.username;
    this.picture = props.picture ?? null;
  }

  async isPasswordValid(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }
}
