import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository.js";

export class DeleteReadmeUseCase {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute(id: string): Promise<void> {
    const readme = await this.readmeRepository.findById(id);

    if (!readme) {
      throw new Error("Readme não encontrado");
    }

    await this.readmeRepository.delete(id);
  }
}
