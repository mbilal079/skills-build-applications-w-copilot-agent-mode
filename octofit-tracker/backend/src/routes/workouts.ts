import { createResourceRouter } from './resource.js';
import { Workout } from '../models/workout.js';

export const workoutsRouter = createResourceRouter(Workout);