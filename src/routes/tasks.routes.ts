import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller";
import { RequestHandler } from "express";

const router = Router();

router.get("/", TaskController.getAllTasks as RequestHandler);
router.post("/", TaskController.createTask as RequestHandler);
router.put("/:id", TaskController.updateTask as RequestHandler);
router.delete("/:id", TaskController.deleteTask as RequestHandler);

export default router;