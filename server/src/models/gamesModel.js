import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  cover: String,
  similar_games: Array,
  summary: String,
  platforms: Array,
  genres: Array,
});

export default mongoose.model('game', gameSchema);
