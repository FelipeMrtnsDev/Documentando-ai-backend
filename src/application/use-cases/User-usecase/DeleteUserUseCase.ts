import { User } from "../../../domain/entities/User.js";
import { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ id }: { id: string }): Promise<void> {
    return await this.userRepository.delete(id);
  }
}
