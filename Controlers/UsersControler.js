const express = require("express");
const verifyToken = require("../auth/verifyToken");
const asyncHandler = require("../middleware/AsyncHandler");
const User = require("../models/Users");
const router = express.Router();

router.post(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const username = req.user;
    const preferences = req.body.preferences;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.updateOne(
      { username: username },
      { $set: { preferences: preferences } }
    );
    res.status(200).json({ message: "Preferences updated successfully" });
  })
);
router.get(
  "/",
  verifyToken,
  asyncHandler(async (req, res) => {
    const username = req.user;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const foundUser = await User.findOne({ username: username });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("-----------");
    console.log(foundUser.preferences);
    res.status(200).json({ preferences: foundUser.preferences });
  })
);

module.exports = router;
