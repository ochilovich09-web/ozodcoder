import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, required: true }, // Course.id (slug)
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 500 },
  },
  { timestamps: true },
)

reviewSchema.index({ user: 1, courseId: 1 }, { unique: true })

export default mongoose.model('Review', reviewSchema)
