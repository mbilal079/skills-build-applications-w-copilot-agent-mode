import mongoose from 'mongoose';
import { Activity } from '../models/activity.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan' },
      { username: 'jamie', email: 'jamie@example.com', displayName: 'Jamie Lee' },
      { username: 'riley', email: 'riley@example.com', displayName: 'Riley Chen' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Taylor' },
    ]);

    const teams = await Team.create([
      {
        name: 'Trail Blazers',
        description: 'Consistent effort, one workout at a time.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Peak Performers',
        description: 'Training together toward new personal bests.',
        members: [users[2]._id, users[3]._id],
      },
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id }),
      User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id }),
      User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id }),
      User.updateOne({ _id: users[3]._id }, { teamId: teams[1]._id }),
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, points: 30 },
      { userId: users[1]._id, type: 'strength', durationMinutes: 45, points: 45 },
      { userId: users[2]._id, type: 'walking', durationMinutes: 35, points: 20 },
      { userId: users[3]._id, type: 'running', durationMinutes: 25, points: 25 },
      { userId: users[0]._id, type: 'strength', durationMinutes: 40, points: 40 },
    ]);

    await Workout.create([
      {
        title: 'Easy Run',
        description: 'A relaxed run to build aerobic endurance.',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
      {
        title: 'Strength Circuit',
        description: 'A full-body circuit using bodyweight exercises.',
        activityType: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
      },
      {
        title: 'Power Intervals',
        description: 'Short running intervals for speed and stamina.',
        activityType: 'running',
        difficulty: 'advanced',
        durationMinutes: 40,
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 5 activities, 3 workouts');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
