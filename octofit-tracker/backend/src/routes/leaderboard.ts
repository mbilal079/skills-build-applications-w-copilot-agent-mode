import { Router } from 'express';
import { Activity } from '../models/activity.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const leaderboard = await Activity.aggregate([
      { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
      { $sort: { points: -1 } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 0, userId: '$_id', username: '$user.username', points: 1, activities: 1 } },
    ]);
    response.json(leaderboard);
  } catch {
    response.status(503).json({ error: 'Database unavailable' });
  }
});