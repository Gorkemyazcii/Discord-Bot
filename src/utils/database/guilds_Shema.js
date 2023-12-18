import mongoose from "mongoose";

export default mongoose.model(
  "guilds",
  new mongoose.Schema({
    guild_id: { type: String, unique: true, required: true },
  })
);
