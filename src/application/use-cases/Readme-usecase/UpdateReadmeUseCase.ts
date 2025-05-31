import { User } from "../../../domain/entities/User.js";
import { IReadmeRepository } from "src/domain/repositories/IReadmeRepository";
import { Readme } from "src/domain/entities/Readme.js";

interface UpdateReadmeDTO {
  id: string;
  title: string;
  description: string;
  stats: string;
  tag: string;
  template: string;
  userId: string;
}

export class UpdateReadmeUseCase {
  constructor(private readmeRepository: IReadmeRepository) {}

  async execute({ id, title, description, stats, tag, template, userId }: UpdateReadmeDTO): Promise<Readme> {
    const readmeExist = await this.readmeRepository.findById(id);
    
    if (!readmeExist) {
      throw new Error("Readme não encontrado");
    }

    const readme = new Readme({
      id,
      title,
      description,
      stats,
      tag,
      template,
      userId
    });

    return await this.readmeRepository.update(readme);
  }
}
