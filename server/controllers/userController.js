const User = require("../database/model/UserSchema");
const validator = require("validator");

const registerUser = async (req, res) => {
  try {
    const validateUsername =
      (await User.findOne({ username: req.body.username }).count()) === 0;
    if (!validateUsername) throw new Error("Username already exists");
    else {
      const user = await User.create(req.body);
      delete user._doc.password;
      res.status(200).json(user._doc);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validate = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Please fill all the fields");
    const emailValidation = validator.isEmail(email);
    if (!emailValidation) throw new Error("Please enter a valid email");
    const passwordValidation = validator.isStrongPassword(password);
    if (!passwordValidation)
      throw new Error(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    res.status(200).json({ message: "Validation successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) throw new Error("Username not found. Please register");
    else {
      const validatePassword = user.password === req.body.password;

      delete user._doc.password;
      if (validatePassword) {
        res.status(200).json(user._doc);
      } else {
        throw new Error("Password is incorrect");
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    delete req.body.password;
    const user = await User.updateOne(
      { username: req.body.username },
      { $set: req.body }
    );
    // const user = await User.create(req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.find({ _id: req.params.id });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctorsBySpeciality = async (req, res) => {
  try {
    const doctors = await User.find({
      role: "Doctor",
      speciality: req.body.speciality,
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getUsers,
  validate,
  getDoctors,
  getDoctorsBySpeciality,
  getDoctorById,
};
