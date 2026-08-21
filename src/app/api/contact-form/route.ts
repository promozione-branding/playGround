// src/app/api/contact-form/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ContactForm from '@/models/ContactForm';

// POST: Save new submission from the form
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const phone = (body.phone || '').trim();
    const product = (body.product || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || !email || !message) {
      return NextResponse.json({ success: false, message: 'Full name, email, and message are required.' }, { status: 400 });
    }

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        return NextResponse.json({ success: false, message: 'Phone number must be exactly 10 digits.' }, { status: 400 });
      }
    }

    await ContactForm.create({
      fullName,
      email,
      phone,
      product,
      message,
    });
    return NextResponse.json({ success: true, message: 'Submitted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit' }, { status: 500 });
  }
}

// GET: Fetch all submissions for Admin
export async function GET() {
  try {
    await connectDB();
    const submissions = await ContactForm.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, submissions });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 });
  }
}

// DELETE: Delete a submission by ID
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }

    await ContactForm.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}
