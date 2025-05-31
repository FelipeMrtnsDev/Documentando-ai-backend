import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository.js"; 
import { Readme } from "src/domain/entities/Readme";

export class ListReadmeUseCase {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute(): Promise<Readme[]> {
    const readmes = await this.readmeRepository.list();
    return readmes;
  }
}
