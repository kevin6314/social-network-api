const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'thought'
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }],
  }, 
  {
    toJSON: { virtuals: true } // Enable virtual fields in toJSON output
  });
  
  // Virtual field for friendCount
  userSchema.virtual('friendCount').get(function () {
    //return this.friends.length;
    return (this.friends && Array.isArray(this.friends)) ? this.friends.length : 0;
  });

const User = model('user', userSchema);

module.exports = User;