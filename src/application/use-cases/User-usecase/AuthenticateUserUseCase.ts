import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface AuthenticateUserDTO {
  email: string;
  password: string;
  name: string;
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    email,
    password,
    name,
  }: AuthenticateUserDTO): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error("Senha incorreta.");
    }

    const token = jwt.sign({ id: user.id }, "secreta123", {
      expiresIn: "1h",
    });

    return token;
  }
}
