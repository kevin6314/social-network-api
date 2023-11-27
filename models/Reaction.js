const { Schema, Types } = require('mongoose');
const User = require('./User');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
      validate: {
        validator: async function (value) {
          const user = await User.findOne({ username: value });
          return user !== null; // Return true if the user exists, false otherwise
        },
        message: 'The specified username does not exist' // Error message if validation fails
      }
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleString() // Getter method to format timestamp
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
  
  module.exports = reactionSchema;