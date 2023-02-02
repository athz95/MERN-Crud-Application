import express from 'express'
const router = express.Router()
import { registerUser, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'


//register and get users
router.route("/").post(registerUser).get(getUsers)

//delete user by id && //get user by ID
router.route('/:id')
      .delete(deleteUser)
      .get( getUserById)
      .put( updateUser)



export default router