import { User } from "../entities/User.js";

export interface IUserRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  list(): Promise<User[]>
  listOne(id: string): Promise<User>
  delete(id: string): Promise<void>
  update(user: User): Promise<User>
}