import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository.js";
import { Readme } from "src/domain/entities/Readme";

export class ListOneReadmeByUserUseCase {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute(readmeId: string, userId: string): Promise<Readme> {
    const readme = await this.readmeRepository.findById(readmeId);

    if (!readme || readme.userId !== userId) {
      throw new Error("Readme não encontrado ou não pertence ao usuário");
    }

    return readme;
  }
}