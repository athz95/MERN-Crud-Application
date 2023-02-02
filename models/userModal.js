import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      gender:{
          type: String,
          required: true,
      },
      mobileNumber:{
          type: Number,
          required: true,
      },
      country: {
          type: String,
          required: true,
      }
    },
    {
      timestamps: true,
    }
  )


const User = mongoose.model('User', userSchema)

export default User