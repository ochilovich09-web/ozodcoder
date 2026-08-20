import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String },
    videoUrl: { type: String, required: true },
  },
  { _id: false },
)

const courseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true }, // slug, masalan "react-tailwind"
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String, required: true },
    level: { type: String, default: 'Beginner' },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    duration: { type: String },
    instructor: { type: String },
    thumbnail: { type: String },
    description: { type: String },
    lessons: [lessonSchema],
  },
  { timestamps: true },
)

export default mongoose.model('Course', courseSchema)
