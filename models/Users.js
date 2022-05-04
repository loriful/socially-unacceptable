const { Schema, model} = require('mongoose');

const UsersSchema = new Schema({
      username: {
        type: String,
        unique: [true, "This name is already in use."],
        required: [true, "Name is required."],
        trim: true
      },
        email: {
        type: String,
        unique: [true, "The provided email is already in use."],
        required: [true, "Email is required."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
      },
      // thoughts: [ThoughtSchema],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "Users"
        }
      ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
});  // UsersSchema

UsersSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});
  
const Users = model('Users', UsersSchema);

module.exports = Users;
