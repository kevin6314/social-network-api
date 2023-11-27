const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
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
    reactions: [reactionSchema] // Array of nested documents using the reactionSchema
  }, 
  {
    toJSON: { virtuals: true } // Enable virtual fields in toJSON output
  }
  );
  
  // Virtual field for reactionCount
  thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;