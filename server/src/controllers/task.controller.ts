import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title, userId } = req.body;
  const task = await taskService.createTask({ title, userId });
  res.status(201).json(task);
};
