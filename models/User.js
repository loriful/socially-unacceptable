const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
      username: {
        type: String,
        unique: "This name is already in use.",
        required: "Name is required.",
        trim: true
      },
      email: {
        type: String,
        unique: "The provided email is already in use.",
        required: "Email is required.",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
      },
      thoughts: [ 
        {
          type: Schema.Types.ObjectId,
          ref: "Thought"
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
      ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});  // UserSchema

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
  
const User = model('User', UserSchema);

module.exports = User;
