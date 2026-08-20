import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ozodcoder'
  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB ulandi')
  } catch (err) {
    console.error('❌ MongoDB ulanishda xatolik:', err.message)
    process.exit(1)
  }
}
