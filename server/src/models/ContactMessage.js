import mongoose from 'mongoose'

export const MESSAGE_STATUSES = ['new', 'read', 'archived']

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    status: { type: String, enum: MESSAGE_STATUSES, default: 'new', index: true },
    // SHA-256 of email + message, used to detect duplicate submissions without extra personal data.
    fingerprint: { type: String, required: true, index: true },
  },
  { timestamps: true }, // adds createdAt and updatedAt
)

contactMessageSchema.index({ fingerprint: 1, createdAt: -1 })

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema)

export default ContactMessage
