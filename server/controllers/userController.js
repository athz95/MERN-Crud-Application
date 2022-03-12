import asyncHandler from 'express-async-handler'
import User from '../models/userModal.js'


// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, gender, mobileNumber ,country } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      country,
      gender,
      mobileNumber
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        country: user.country,
        mobileNumber: user.mobileNumber
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
  

//@description  Get All Users
//@route        Get /api/users
//@access       Public

const getUsers = asyncHandler(async (req,res) => {
  const users = await User.find({})
  res.json(users)

})

//@description  Delete Users
//@route        DELETE /api/users/:id
//@access       Public

const deleteUser = asyncHandler(async (req,res) => {
  const users = await User.findById(req.params.id)
  
  if(users) {
      await users.remove()
      res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }

})

// @desc    Get user by ID
// @route   GET /api/users/:id
//@access       Public

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// @desc    Update user
// @route   PUT /api/users/:id
//@access   Public

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender || user.gender
    user.country = req.body.country || user.country
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber

    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        gender: updatedUser.gender,
        country: updatedUser.country,
        mobileNumber: updatedUser.mobileNumber,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


export { registerUser, getUsers, deleteUser, getUserById, updateUser }