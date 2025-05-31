import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";
import { User } from "../../../domain/entities/User.js";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

interface UpdateUserDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  picture: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password, username, picture, id }: UpdateUserDTO): Promise<User> {
    const userAlredyExist = await this.userRepository.findByEmail(email);
    
    if (!userAlredyExist) {
      throw new Error("Usuario não encontrado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id,
      name,
      email,
      username,
      picture,
      password: hashedPassword,
    });

    return await this.userRepository.update(user);
  }
}
