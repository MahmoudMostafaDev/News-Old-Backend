const verifyToken = require("../auth/verifyToken");
const asyncHandler = require("../middleware/AsyncHandler");
const { Saved } = require("../models/News");
const Users = require("../models/Users");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    try {
      const user = await Users.findOne({ username: req.user });
      const data = await Saved.find({ url: { $in: user.saved } });
      if (data && data.length) {
        return res.json({ code: 200, data });
      }
      return res.json({ code: 404, msg: "there is no saved" });
    } catch (err) {
      console.log(err);
      return res.json({ code: 500, msg: "unkown error" });
    }
  })
);

router.post(
  "/",
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { title, description, image, url } = req.body;
    const user = req.user;
    if (!title || !description || !image || !url || !user) {
      return res.status(400).json({ msg: "invalid data" });
    }
    try {
      if (!(await Saved.exists({ title: title }))) {
        await Saved.insertMany({
          title,
          description,
          image,
          url,
          category: "non",
        });
      }
      console.log("m1");
      const userData = await Users.findOne({ username: user });
      if (!userData) {
        return res.status(401).json({ msg: "user not found" });
      }
      await Users.updateOne(
        { username: user },
        { $set: { saved: [...userData.saved, url] } }
      );
      return res.status(200).json({ msg: "done" });
    } catch (error) {
      console.log(error);
      return res.status(402).json({ msg: "unkown error" });
    }
  })
);
module.exports = router;
