require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const migrate_table = require("./src/helpers/migrate_table");
const seed_table = require("./src/helpers/seed_table");

const authRouter = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");

const app = express();
// MIDDLE WARES
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// migrate_table();
// seed_table();

app.use("/api/", authRouter);
app.use("/api/", userRouter);
app.use("/api/cookies", (req, res) => {
  res.json({
    cookies: req.cookies,
    secret: req.cookies.otp_secret,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
