import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository";
import { Readme } from "src/domain/entities/Readme";

export class ListReadmeByUser {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute(userId: string): Promise<Readme[] | null> {
    const readmes = await this.readmeRepository.findByUserId(userId);

    return readmes;
  }
}
