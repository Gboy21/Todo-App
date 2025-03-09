import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Task } from "../entities/Task";
import { validate } from "class-validator";


export class TaskController {
  static async getAllTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const tasks = await taskRepository.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const task = new Task();
      Object.assign(task, req.body);
      
      const errors = await validate(task);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const taskRepository = AppDataSource.getRepository(Task);
      await taskRepository.save(task);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Validate input
      const updates = req.body;
      const validationErrors = await validate(updates);
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
  
      // Update only changed fields
      Object.assign(task, updates);
      await taskRepository.save(task);
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await taskRepository.remove(task);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}