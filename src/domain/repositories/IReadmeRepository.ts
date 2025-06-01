import { Readme } from "../entities/Readme.js";

export interface IReadmeRepository {
  create(readme: Readme): Promise<void>
  findById(id: string): Promise<Readme | null>
  findByUserId(userId: string): Promise<Readme[] | null>
  list(): Promise<Readme[]>
  listOne(id: string): Promise<Readme>
  delete(id: string): Promise<void>
  update(readme: Readme): Promise<Readme>
}