const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { userSeed, thoughtSeed, reactionSeed } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  try {
    // Drop collections if they exist
    //await User.collection.drop();
    //await Thought.collection.drop();

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }
    
    let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
    }
    
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
    
    const users = userSeed.map(username => ({ username })); // Create users directly from userSeed
    
    const thoughts = [];

    for (let i = 0; i < 3; i++) {
      const newThought = {
        thoughtText: getRandomItem(thoughtSeed),
        username: getRandomItem(users).username,
        reactions: [{
          reactionBody: getRandomItem(reactionSeed),
          username: getRandomItem(userSeed)
        }]
      };

      thoughts.push(newThought);
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error while seeding:', error);
    process.exit(0);
  }
});
