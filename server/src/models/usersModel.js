import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedGames: Array,
});

userSchema.pre('save', async function (next) {
  try {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hash;
    this.likedGames = [];
    next();
  } catch (error) {
    return next({
      message: error,
    });
  }
});

export default mongoose.model('user', userSchema);
