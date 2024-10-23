const connectDB = require("./config/db");
const manageAPI = require("./lib/ManageGnewsAPI");
const express = require("express");
const cors = require("cors");
const app = express();
const headNewsRouter = require("./Controlers/HeadNewsControler");
const newsRouter = require("./Controlers/NewsControler");
const userRouter = require("./Controlers/UsersControler");
const saveRouter = require("./Controlers/SavedControler");
const ErrorHandler = require("./middleware/ErrorHandler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./models/Users");

//set up server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());
//routes

app.use("/api/v1/headnews", headNewsRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/preferences", userRouter);
app.use("/api/v1/save", saveRouter);
app.use(ErrorHandler);

//connect database
connectDB();

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//fetch data everyday
manageAPI.executeEveryDay(manageAPI.addHeadNewssToDB);
manageAPI.executeEveryDay(manageAPI.addNewssToDB);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const foundUser = await Users.findOne({ username: username });
  console.log(foundUser);
  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log(password);
  const valid = await bcrypt.compare(password, foundUser.password || "");
  if (!valid) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const accessToken = jwt.sign(
    { username: foundUser.username, password: foundUser.password },
    process.env.ACCESS_TOKEN_SECRET
  );

  res.json({ accessToken });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const foundUser = await Users.find({ username: username });
  console.log(foundUser);
  if (foundUser.length > 0) {
    return res.status(409).json({ message: "Username already exists" });
  }
  const hashed = bcrypt.hashSync(password, 8);
  const createUser = await Users.create({
    username,
    password: hashed,
    preferences: req.body.preferences,
  });

  const accessToken = jwt.sign(
    { username: createUser.username, password: createUser.password },
    process.env.ACCESS_TOKEN_SECRET
  );
  res.json({ accessToken });
});
