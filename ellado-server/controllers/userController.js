const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*GET USERS*/
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { password, type, ...rest } = req.body;

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const allowedType = type || "viewer"; // default role

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      ...rest,
      password: hashedPassword,
      type: allowedType
    });

    res.status(201).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      type: user.type
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.type && req.user.type !== "admin") {
      delete updates.type;
    }

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/*DELETE USER*/
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: 'Your account is inactive. Please contact support.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        type: user.type
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      type: user.type,
      firstName: user.firstName
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};