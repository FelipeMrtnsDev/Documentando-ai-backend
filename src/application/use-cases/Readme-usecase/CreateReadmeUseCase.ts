import { randomUUID } from "crypto";
import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository.js";
import { Readme } from "src/domain/entities/Readme.js";
import { IUserRepository } from "src/domain/repositories/IUserRepository";

interface CreateReadmeDTO {
  title: string;
  stats: "publicado" | "rascunho";
  description: string;
  template: string;
  tag: string;
  userId: string;
}

export class CreateReadmeUseCase {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute({
    title,
    stats,
    description,
    template,
    tag,
    userId
  }: CreateReadmeDTO): Promise<void> {
    const readme = new Readme({
      id: randomUUID(),
      title,
      stats,
      description,
      template,
      tag,
      userId,
    });

    await this.readmeRepository.create(readme);
  }
}

