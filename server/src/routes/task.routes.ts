import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middlewares/validateMiddleware';
import { createTaskSchema, updateTaskSchema } from '../validations/taskSchema';
import { authenticate } from '../middlewares/authMiddleware'; // se non è già incluso in app.ts
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.use(authenticate as any); 

router.get('/', taskController.getTasks);
router.get('/:id', asyncHandler(taskController.getTaskById));
router.post('/', validate(createTaskSchema), taskController.createTask);
router.put('/:id', validate(updateTaskSchema), asyncHandler(taskController.updateTask));
router.delete('/:id', asyncHandler(taskController.deleteTask));

export default router;
