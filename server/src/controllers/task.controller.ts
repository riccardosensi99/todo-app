import { Request, Response } from 'express';
import * as taskService from '../services/task.service';

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getTasksByUserId(req.user!.userId);
  res.json(tasks);
};

export const getTaskById = async (req: Request, res: Response) => {
  const task = await taskService.getTaskById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task non trovato' });
  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = await taskService.createTask({
    title,
    description,
    userId: req.user!.userId,
  });
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { title, description, completed } = req.body;
    const task = await taskService.updateTask(req.params.id, { title, description, completed });
    if (!task) return res.status(404).json({ message: 'Task non trovato' });
    res.json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Errore durante aggiornamento' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task non trovato' });
    res.json({ message: 'Task eliminato' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Errore durante eliminazione' });
  }
};
