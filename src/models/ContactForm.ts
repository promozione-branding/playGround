// src/models/ContactForm.ts
import mongoose from 'mongoose';

const ContactFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    product: { type: String, default: '' },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactForm || mongoose.model('ContactForm', ContactFormSchema);
