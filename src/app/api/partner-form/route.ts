// src/app/api/partner-form/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PartnerForm from '@/models/PartnerForm';

// POST: Save partner submission
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const company = (body.company || '').trim();
    const phone = (body.phone || '').trim();
    const state = (body.state || '').trim();
    const city = (body.city || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || !email || !phone || !state || !city) {
      return NextResponse.json({ success: false, message: 'All required fields must be filled.' }, { status: 400 });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return NextResponse.json({ success: false, message: 'Phone number must be exactly 10 digits.' }, { status: 400 });
    }

    await PartnerForm.create({
      fullName,
      email,
      company,
      phone,
      state,
      city,
      message,
    });
    return NextResponse.json({ success: true, message: 'Partner request submitted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit' }, { status: 500 });
  }
}

// GET: Fetch all partner requests for Admin
export async function GET() {
  try {
    await connectDB();
    const submissions = await PartnerForm.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, submissions });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch' }, { status: 500 });
  }
}

// DELETE: Delete a partner request by ID
export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await PartnerForm.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to delete' }, { status: 500 });
  }
}
