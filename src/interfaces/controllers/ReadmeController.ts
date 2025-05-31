import { Request, Response } from "express";
import { CreateReadmeUseCase } from "src/application/use-cases/Readme-usecase/CreateReadmeUseCase";
import { ListOneReadmeByUserUseCase } from "src/application/use-cases/Readme-usecase/ListOneReadmeByUserUseCase";
import { ListReadmeUseCase } from "src/application/use-cases/Readme-usecase/ListReadmeUseCase";
import { UpdateReadmeUseCase } from "src/application/use-cases/Readme-usecase/UpdateReadmeUseCase";
import jwt from "jsonwebtoken"
import { DeleteReadmeUseCase } from "src/application/use-cases/Readme-usecase/DeleteReadmeUseCase";
import { ListReadmeByUser } from "src/application/use-cases/Readme-usecase/ListReadmeByUserUseCase";


export class ReadmeController {
  constructor(
    private createReadmeUseCase: CreateReadmeUseCase,
    private deleteReadmeUseCase: DeleteReadmeUseCase,
    private listOneReadmeByUserUseCase: ListOneReadmeByUserUseCase,
    private listReadmeByUserUseCase: ListReadmeByUser,
    private listReadmeUseCase: ListReadmeUseCase,
    private updateReadmeUseCase: UpdateReadmeUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { userId, title, stats, description, template, tag } = req.body

    try {
      await this.createReadmeUseCase.execute({
        userId,
        title,
        stats,
        description,
        template,
        tag
      })
      return res.status(201).json({ message: "Usuário criado com sucesso!" })
    } catch(error) {
      const err = error as Error
      return res.status(400).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.listReadmeUseCase.execute();
      return res.status(200).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async listOne(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

      const readme = await this.listOneReadmeByUserUseCase.execute(id, decoded.userId);
      return res.status(200).json(readme);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: "Token inválido: " + err.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const users = await this.deleteReadmeUseCase.execute(id);
      return res.status(204).json(users);
    } catch (error) {
      const err = error as Error;
      return res.status(400).json({ message: err.message });
    }
  }

  async listByUser(req: Request, res: Response): Promise<Response> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

      const readme = await this.listReadmeByUserUseCase.execute(decoded.userId);
      return res.status(200).json(readme);
    } catch (error) {
      const err = error as Error;
      return res.status(401).json({ message: "Token inválido: " + err.message });
    }
  }

}