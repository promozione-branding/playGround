import { NextResponse } from "next/server";
import crypto from "crypto";
import sharp from "sharp";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadToR2 } from "@/app/utils/uploadToR2";

export const dynamic = "force-dynamic";

// 1. GET ALL BLOGS
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      return NextResponse.json({ success: true, blog });
    }

    const blogs = await Blog.find().sort({ date: -1, createdAt: -1 });
    return NextResponse.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}

// 2. CREATE A NEW BLOG
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();
    const permalink = (formData.get("permalink") as string)?.trim();
    const date = formData.get("date") as string;
    const metaTitle = (formData.get("metaTitle") as string)?.trim();
    const metaDescription = (formData.get("metaDescription") as string)?.trim();
    const content = formData.get("content") as string;
    const thumbnailFile = formData.get("thumbnail") as File | null;

    if (!title || !content || !thumbnailFile || !date) {
      return NextResponse.json({ success: false, message: "Required fields missing" }, { status: 400 });
    }

    // Auto-generate URL slug
    let slug = (permalink || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${crypto.randomBytes(2).toString("hex")}`;
    }

    // Compress & resize image to WebP format (Max 1200px width/height, ~40-60KB size target)
    const arrayBuffer = await thumbnailFile.arrayBuffer();
    const compressedBuffer = await sharp(Buffer.from(arrayBuffer))
      .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    const fileName = `${Date.now()}-${slug}.webp`;

    // Upload to Cloudflare R2
    const uploadResult = await uploadToR2({
      file: compressedBuffer,
      folder: "blogs",
      fileName,
      contentType: "image/webp",
    });

    const blog = await Blog.create({
      title,
      slug,
      date: new Date(date),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || "",
      content,
      thumbnail: {
        url: uploadResult.url,
        imageKey: uploadResult.key,
      },
    });

    return NextResponse.json({ success: true, message: "Blog created successfully", blog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to create blog" }, { status: 500 });
  }
}
