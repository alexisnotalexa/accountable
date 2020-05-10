const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 11;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name field is required.']
  },
  lastName: {
    type: String,
    required: [true, 'Last name field is required.']
  },
  email: {
    type: String,
    required: [true, 'A valid email address is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'A valid password is required.'],
    validate: {
      validator: (password) => {
        return password.length >= 6;
      },
      message: 'Your password must be at least 6 characters.'
    }
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user']
  }
}, { timestamps: true });

UserSchema.pre('save', function(next) {
  let user = this;

  // Only hash the password if it is new or has been modified
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_ROUNDS, (error, salt) => {
    if (error) return next(error);

    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function(candidatePassword, cb) {
 return await bcrypt.compare(candidatePassword, this.password); 
};

module.exports = mongoose.model('User', UserSchema);