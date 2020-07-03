import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    theme: {
      type: String,
      required: true,
      default: 'light',
    },
    partner: {
      email: {
        type: String,
        required: false,
      },
      connected: {
        type: Boolean,
        required: false,
      },
    },
  },
})

userSchema.pre('save', function (next) {
  if (!this.isModified) {
    return next()
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salte) {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, match) => {
      if (err) {
        return reject(err)
      }

      resolve(match)
    })
  })
}

const User = mongoose.model('user', userSchema)

export { User }
