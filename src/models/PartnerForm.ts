// src/models/PartnerForm.ts
import mongoose from 'mongoose';
const PartnerFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    message: { type: String, default: '' },
  },
  { timestamps: true }
);
export default mongoose.models.PartnerForm || mongoose.model('PartnerForm', PartnerFormSchema);