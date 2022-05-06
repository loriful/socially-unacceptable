const { Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: "Reaction is required.",
    maxlength: 280
    // set string size to max 280 chars
  },  
  username: {
    type: String,
    required: "A user name is required.",
  },   
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },
  },
  {
    toJSON: {
      getters: true
    }
  }

); // end Reaction Scheme

const ThoughtSchema = new Schema({
      thoughtText: {
        type: String,
        required: "Thought is required.",
        maxlength: 280,
        minlength: 1
        // set string size to 1-280 chars
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },  
      username: {
        type: String,
        required: "A user name is required."
      },   
      reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});  // UserSchema

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});
  
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;

