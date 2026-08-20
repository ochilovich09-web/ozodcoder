import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function signToken(user) {
  return jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

function toPublicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Barcha maydonlar to'ldirilishi shart" })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Parol kamida 6 belgidan iborat bo'lishi kerak" })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: 'Bu email allaqachon ro\'yxatdan o\'tgan' })
    }

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed })

    const token = signToken(user)
    res.status(201).json({ token, user: toPublicUser(user) })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parol talab qilinadi' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: "Email yoki parol noto'g'ri" })
    }

    const token = signToken(user)
    res.json({ token, user: toPublicUser(user) })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
    res.json({ user: toPublicUser(user) })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}
