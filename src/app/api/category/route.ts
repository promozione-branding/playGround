import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import { uploadToR2 } from "@/app/utils/uploadToR2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET ALL CATEGORIES
export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find().sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                count: categories.length,
                categories,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get categories error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch categories",
            },
            { status: 500 }
        );
    }
}

// CREATE CATEGORY
export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();
        
        const name = (formData.get("name") as string)?.trim();
        const slug = (formData.get("slug") as string)?.trim().toLowerCase();
        const metaTitle = (formData.get("metaTitle") as string)?.trim() || "";
        const metaDescription = (formData.get("metaDescription") as string)?.trim() || "";
        const image = formData.get("image") as File | null;

        if (!name || !slug) {
            return NextResponse.json(
                { success: false, message: "Name and slug are required" },
                { status: 400 }
            );
        }

        if (!image) {
            return NextResponse.json(
                { success: false, message: "Category image is required" },
                { status: 400 }
            );
        }

        const existingCategory = await Category.findOne({
            $or: [{ name }, { slug }],
        });

        if (existingCategory) {
            return NextResponse.json(
                { success: false, message: "Category with this name or slug already exists" },
                { status: 400 }
            );
        }

        // Upload image to R2
        let uploadedImage = { url: "", imageKey: "" };
        try {
            const buffer = Buffer.from(await image.arrayBuffer());
            const uploadResult = await uploadToR2({
                file: buffer,
                folder: "categories",
                fileName: image.name,
                contentType: image.type,
            });
            uploadedImage = { url: uploadResult.url, imageKey: uploadResult.key };
        } catch (uploadError) {
            console.error("R2 upload error for category:", uploadError);
            return NextResponse.json(
                { success: false, message: "Failed to upload category image" },
                { status: 500 }
            );
        }

        const category = await Category.create({
            name,
            slug,
            image: uploadedImage,
            metaTitle,
            metaDescription,
        });

        return NextResponse.json(
            { success: true, message: "Category created successfully", category },
            { status: 201 }
        );
    } catch (error) {
        console.error("Create category error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create category" },
            { status: 500 }
        );
    }
}
