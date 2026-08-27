import { createResourceRouter } from './resource.js';
import { Team } from '../models/team.js';

export const teamsRouter = createResourceRouter(Team);