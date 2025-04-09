import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      console.log('❌ Errore validazione Zod:', result.error.errors);
      console.dir(result.error.format(), { depth: null });
      const errors = result.error.errors.map(err => err.message);
      res.status(400).json({ errors }); 
      return; 
    }
    console.log('✅ VALIDAZIONE PASSATA, passo al controller');
    next();
  };
