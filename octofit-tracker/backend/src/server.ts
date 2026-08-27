import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiBaseUrl, apiPort } from './config/api.js';
import { usersRouter } from './routes/users.js';
import { teamsRouter } from './routes/teams.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { workoutsRouter } from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT) || apiPort;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});

connectDatabase().catch((error) => {
  console.error('Unable to connect to octofit_db:', error);
});
