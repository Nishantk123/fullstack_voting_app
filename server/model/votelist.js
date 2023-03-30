const mongoose = require("mongoose");

const voterlistSchema = new mongoose.Schema({
  user_id: {type: String, default:null},
  candidate_name: {type: String, default: null},
  date: { type: Date, default:null}
})

module.exports = mongoose.model("voterlist", voterlistSchema);