import { NextResponse } from "next/server";
import sharp from "sharp";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { uploadToR2 } from "@/app/utils/uploadToR2";
import { deleteFromR2 } from "@/app/utils/deleteFromR2";

export const dynamic = "force-dynamic";

// =====================================================
// GET SINGLE BLOG
// GET /api/blog/[id]
// =====================================================

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    console.log(id)

    let slug =id

    const blog = await Blog.findOne({slug}).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get single blog error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE BLOG
// DELETE /api/blog/[id]
// =====================================================

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    // Delete thumbnail from R2
    if (blog.thumbnail?.imageKey) {
      await deleteFromR2(blog.thumbnail.imageKey);
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// UPDATE BLOG
// PUT /api/blog/[id]
// =====================================================

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const title = (formData.get("title") as string)?.trim();

    const permalink = (formData.get("permalink") as string)?.trim();

    const date = formData.get("date") as string;

    const metaTitle = (formData.get("metaTitle") as string)?.trim();

    const metaDescription = (
      formData.get("metaDescription") as string
    )?.trim();

    const content = formData.get("content") as string;

    const thumbnailFile = formData.get("thumbnail") as File | null;

    const updateData: any = {
      title: title || blog.title,

      date: date ? new Date(date) : blog.date,

      metaTitle: metaTitle || title || blog.metaTitle,

      metaDescription:
        metaDescription ?? blog.metaDescription,

      content: content || blog.content,
    };

    // Generate slug
    if (permalink) {
      updateData.slug = permalink
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");
    }

    // Upload new thumbnail
    if (thumbnailFile && thumbnailFile.size > 0) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();

      const compressedBuffer = await sharp(
        Buffer.from(arrayBuffer)
      )
        .resize(1200, 800, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 75,
        })
        .toBuffer();

      const fileName = `${
        Date.now()
      }-${updateData.slug || blog.slug}.webp`;

      const uploadResult = await uploadToR2({
        file: compressedBuffer,
        folder: "blogs",
        fileName,
        contentType: "image/webp",
      });

      // Delete old thumbnail
      if (blog.thumbnail?.imageKey) {
        await deleteFromR2(blog.thumbnail.imageKey);
      }

      updateData.thumbnail = {
        url: uploadResult.url,
        imageKey: uploadResult.key,
      };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Update blog error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
      },
      { status: 500 }
    );
  }
}