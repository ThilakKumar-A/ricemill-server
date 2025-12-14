import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Admin from '../models/adminModel.js';

// @desc    Create a new admin
// @route   POST /api/admins
// @access  Private/Admin
const createAdmin = asyncHandler(async (req, res) => {
  const { name, username, password } = req.body;

  // Check if username already exists for this client
  const adminExists = await Admin.findOne({ username });

  if (adminExists) {
    res.status(400);
    throw new Error('Admin already exists');
  }

  const admin = await Admin.create({
    name,
    username,
    password
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      active: admin.active,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid admin data');
  }
});

// @desc    Get all admins
// @route   GET /api/admins
// @access  Private/Admin
const getAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({}).select('-password');
  res.json(admins);
});

// @desc    Delete admin
// @route   DELETE /api/admins/:id
// @access  Private/Admin
const deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  if (admin) {
    await admin.remove();
    res.json({ message: 'Admin removed' });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Toggle admin active status
// @route   PUT /api/admins/:id/active
// @access  Private/Admin
const toggleAdminStatus = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  
  if (!admin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  if (admin) {
    admin.active = !admin.active;
    const updatedAdmin = await admin.save();
    res.json({
      _id: updatedAdmin._id,
      name: updatedAdmin.name,
      username: updatedAdmin.username,
      active: updatedAdmin.active,
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

// @desc    Auth admin & get token
// @route   POST /api/admins/login
// @access  Public
const authAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  const admin = await Admin.findOne({ username });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get admin profile
// @route   GET /api/admins/profile
// @access  Private
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-password');
  
  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      username: admin.username,
      active: admin.active
    });
  } else {
    res.status(404);
    throw new Error('Admin not found');
  }
});

export { 
  createAdmin, 
  getAdmins, 
  deleteAdmin, 
  toggleAdminStatus, 
  authAdmin, 
  getAdminProfile 
};
