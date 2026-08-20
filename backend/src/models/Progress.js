import mongoose from 'mongoose'

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, required: true }, // Course.id (slug)
    completedLessons: [{ type: String }], // lesson id lar
  },
  { timestamps: true },
)

progressSchema.index({ user: 1, courseId: 1 }, { unique: true })

export default mongoose.model('Progress', progressSchema)
