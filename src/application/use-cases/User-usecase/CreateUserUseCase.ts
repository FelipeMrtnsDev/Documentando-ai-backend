import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { User } from "../../../domain/entities/User.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  username: string;
  picture: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password, username, picture }: CreateUserDTO): Promise<void> {
    const userAlredyExist = await this.userRepository.findByEmail(email);
    if (userAlredyExist) {
      throw new Error("Email já esta em uso.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: randomUUID(),
      name,
      email,
      username,
      picture,
      password: hashedPassword,
    });

    await this.userRepository.create(user);
  }
}
