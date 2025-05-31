import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController.js";
import { CreateUserUseCase } from "../../application/use-cases/User-usecase/CreateUserUseCase.js";
import { ListUsersUseCase } from "../../application/use-cases/User-usecase/ListUsersUseCase.js";
import { PrismaUserRepository } from "src/infraestructure/repositories/PrismaUserRepository.js";
import { AuthenticateUserUseCase } from "../../application/use-cases/User-usecase/AuthenticateUserUseCase.js";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated.js";
import { DeleteUserUseCase } from "src/application/use-cases/User-usecase/DeleteUserUseCase.js";
import { ListOneUserUseCase } from "src/application/use-cases/User-usecase/ListOneUserUseCase.js";

const router = Router();

const userRepository = new PrismaUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const listUserUseCase = new ListUsersUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const listOneUserUseCase = new ListOneUserUseCase(userRepository)
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const userController = new UserController(
  createUserUseCase,
  listUserUseCase,
  authenticateUserUseCase,
  deleteUserUseCase,
  listOneUserUseCase
);

router.get("/users", ensureAuthenticated, async (req, res) => {
  await userController.list(req, res); //ok
});

router.get("/user/:id" ,ensureAuthenticated, async (req, res) => {
  await userController.listOne(req, res)
})

router.delete("/user/:id", ensureAuthenticated, async (req, res) => {
  await userController.delete(req, res); //ok
});

router.post("/user", async (req, res) => {
  await userController.create(req, res); //ok
});

router.post("/login", async (req, res) => {
  await userController.authenticate(req, res); //ok
});

export { router };
