const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
}, {
  timestamps: true,
  versionKey: false,
});

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
