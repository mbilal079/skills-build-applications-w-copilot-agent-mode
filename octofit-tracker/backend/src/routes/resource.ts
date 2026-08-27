import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(model: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request, response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }).lean());
    } catch {
      response.status(503).json({ error: 'Database unavailable' });
    }
  });

  router.post('/', async (request, response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
    }
  });

  return router;
}