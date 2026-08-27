import { createResourceRouter } from './resource.js';
import { User } from '../models/user.js';

export const usersRouter = createResourceRouter(User);