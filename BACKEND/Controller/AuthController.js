const User = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterUser = async (req, res) => {
  const { username, Email, password } = req.body;
  try {
    if (
      username === "" ||
      Email === "" ||
      password === "" ||
      !username ||
      !Email ||
      !password
    ) {
      return res.json({
        message: "details must be filled",
        success: false,
      });
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.json({
        message: "User already exist with the same email, please try again",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashPassword,
      Email,
    });

    await newUser.save();

    return res.status(200).json({
      message: "registration successful",
      success: true,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const LoginUser = async (req, res) => {
  const { Email, password } = req.body;
  try {
    if (!Email || !password) {
      return res.json({
        message: "details must be filled",
        success: false,
      });
    }
    const validUser = await User.findOne({ Email });
    if (!validUser) {
      return res.json({
        message: "User does not exist,Please register first",
        success: false,
      });
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.json({
        message: "incorrect password! Please try again",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: validUser._id,  userName:validUser.username, role: validUser.role, Email: validUser.Email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      message: "User Logged in successfully",
      success: true,
      user: {
        id: validUser._id,
        role: validUser.role,
        Email: validUser.Email,
        userName:validUser.username,
      },
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return res.json({
      message: "User Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error.message,
      success: false,
    });
  }
};

const checkAUth=async(req,res)=>{
  const user= req.User
  return res.json({
    success:true,
    message:'authorised user',
    user
  })
}
module.exports = { RegisterUser,LoginUser,LogoutUser,checkAUth };
