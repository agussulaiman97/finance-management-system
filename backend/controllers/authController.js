const User = require('../models/User')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

// ======================================
// REGISTER
// ======================================

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body

    // cek email
    const existingUser =
      await User.findOne({
        where: { email },
      })

    if (existingUser) {

      return res.status(400).json({
        message: 'Email sudah digunakan',
      })

    }

    // hash password
    const hashedPassword =
      await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    res.status(201).json({
      success: true,
      message: 'Register berhasil',
      user,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Server Error',
    })

  }

}

// ======================================
// LOGIN
// ======================================

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body

    // cek user
    const user = await User.findOne({
      where: { email },
    })

    if (!user) {

      return res.status(404).json({
        message: 'User tidak ditemukan',
      })

    }

    // cek password
    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!validPassword) {

      return res.status(400).json({
        message: 'Password salah',
      })

    }

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      }
    )

    res.status(200).json({
      success: true,
      token,
      user,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      success: false,
      message: 'Server Error',
    })

  }

}