const { HeadNews } = require("../models/News");
const asyncHandler = require("../middleware/AsyncHandler");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    let categories = req.query.categories.split(",");
    const news = await HeadNews.find({ category: { $in: categories } });
    if (!news) {
      return res.status(404).json({ error: "No news found" });
    }
    res.status(200).json(news.slice(0, 2 * categories.length));
  })
);
module.exports = router;
