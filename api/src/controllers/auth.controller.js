const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/auth_tokens");
const User = require("../models/user.model");

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

const attributes = ["username", "user_role"];

// * LOGIN
const login = async (req, res) => {
  // TODO  :  Check if already logged in.
  // ^ Verify username and password.
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User could not be found.",
      });
    }

    // const match = await bcrypt.compare(req.body.password, user.password);
    const match = password == user.password;

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "phone number or password not correct",
      });
    }

    // ^ Generate access and refresh tokens.
    const userPayload = {
      username: user.username,
      user_role: user.user_role,
    };

    const accessToken = generateAccessToken(userPayload);
    const refreshToken = generateRefreshToken(userPayload);

    // ^ Update user refresh token in db for user.
    await user.update({ refresh_token: refreshToken });

    // ^ Set tokens to cookies.
    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
    });

    res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      httpOnly: true,
    });

    // ^ Respond error or success.
    return res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// * REGISTER
const refreshAccessToken = async (req, res) => {
  try {
    // GET REFRESH TOKEN
    const refreshToken =
      req.cookies == undefined ? null : req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token in header" });
    // GET USER WITH THAT REFRESH TOKEN IN THE DATABASE
    const userPayload = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
      attributes,
    });
    // IF THERE IS NO USER WITH THAT REFRESH TOKEN
    if (!userPayload) {
      return res.status(403).json("Unauthorized User");
    }
    // VERIFY
    try {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);

          plainPayload = {
            username: userPayload.username,
            user_role: userPayload.user_role,
          };
          const accessToken = generateAccessToken(plainPayload);

          res.cookie("accessToken", accessToken, {
            httpOnly: true,
          });

          res.status(200).json({
            success: true,
            user,
            userPayload,
            accessToken,
          });
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

// * LOGOUT
const logout = async (req, res) => {
  console.log("I am Here");
  try {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!refreshToken) {
      return res.status(401).json({
        message: "UNAUTHORIZED_MESSAGE",
      });
    }

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "NO_USER_MESSAGE",
      });
    }

    await user.update({ refresh_token: null });

    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
    res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

    return res.status(200).json({
      message: "LOGOUT_MESSAGE",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// * REGISTER
const register = (req, res) => {
  return res.json({ message: "Yes this is up" });
};

module.exports = {
  register,
  login,
  logout,
  refreshAccessToken,
};
