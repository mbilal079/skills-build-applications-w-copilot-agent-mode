import { createResourceRouter } from './resource.js';
import { Activity } from '../models/activity.js';

export const activitiesRouter = createResourceRouter(Activity);