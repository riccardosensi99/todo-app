import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import prisma from '../utils/prisma';

const router = Router();

router.get('/me', authenticate, async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ message: 'Utente non autenticato' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'Utente non trovato' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Errore interno del server' });
  }
});

export default router;
