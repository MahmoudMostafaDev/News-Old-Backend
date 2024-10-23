const { News } = require("../models/News");
const asyncHandler = require("../middleware/AsyncHandler");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const page = req.query.page;
    const categories = req.query.categories.split(",");
    console.log(categories);
    const news = await News.find({ category: { $in: categories } })
      .skip(page * 10 - 10)
      .limit(10);
    console.log((await News.find({ category: { $in: categories } })).length);
    if (!news) {
      return res.status(404).json({ error: "No news found" });
    }
    res.status(200).json({ page, news });
  })
);
module.exports = router;
