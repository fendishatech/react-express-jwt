require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRouter = require("./src/routes/auth.route");
const userRouter = require("./src/routes/user.route");

const app = express();
// MIDDLE WARES
app.use(express.json());
app.use(cors());

app.use("/api/", authRouter);
app.use("/api/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`App running on http://localhost:${process.env.PORT}`);
});
