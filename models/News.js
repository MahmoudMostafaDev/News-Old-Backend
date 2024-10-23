const Mongoose = require("mongoose");

const NewsSchema = new Mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
});

const HeadNews = Mongoose.model("HeadNews", NewsSchema);
const News = Mongoose.model("News", NewsSchema);
const Saved = Mongoose.model("Saved", NewsSchema);
module.exports = { HeadNews, News, Saved };
