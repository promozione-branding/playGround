import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/product";
import { deleteFromR2 } from "@/app/utils/deleteFromR2";
import { uploadToR2 } from "@/app/utils/uploadToR2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// UPDATE CATEGORY
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

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

        // Check if another category has the same name or slug
        const existingCategory = await Category.findOne({
            _id: { $ne: id },
            $or: [{ name }, { slug }],
        });

        if (existingCategory) {
            return NextResponse.json(
                { success: false, message: "Another category with this name or slug already exists" },
                { status: 400 }
            );
        }

        const removeImage = formData.get("removeImage") === "true";
        let updatedImageData = category.image;

        if (removeImage) {
            // Delete old image from R2 if present
            if (category.image && category.image.imageKey) {
                try {
                    await deleteFromR2(category.image.imageKey);
                } catch (imgError) {
                    console.error("Failed to delete old R2 image:", imgError);
                }
            }
            updatedImageData = { url: "", imageKey: "" };
        } else if (image && typeof image !== "string" && image.size > 0) {
            // Delete old image from R2 if present
            if (category.image && category.image.imageKey) {
                try {
                    await deleteFromR2(category.image.imageKey);
                } catch (imgError) {
                    console.error("Failed to delete old R2 image:", imgError);
                }
            }

            // Upload new image to R2
            try {
                const buffer = Buffer.from(await image.arrayBuffer());
                const uploadResult = await uploadToR2({
                    file: buffer,
                    folder: "categories",
                    fileName: image.name,
                    contentType: image.type,
                });
                updatedImageData = { url: uploadResult.url, imageKey: uploadResult.key };
            } catch (uploadError) {
                console.error("Failed to upload new category image to R2:", uploadError);
                return NextResponse.json(
                    { success: false, message: "Failed to upload new category image" },
                    { status: 500 }
                );
            }
        }

        category.name = name;
        category.slug = slug;
        category.metaTitle = metaTitle;
        category.metaDescription = metaDescription;
        category.image = updatedImageData;

        await category.save();

        return NextResponse.json(
            { success: true, message: "Category updated successfully", category },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update category error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update category" },
            { status: 500 }
        );
    }
}

// DELETE CATEGORY
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        // Check if category exists
        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json(
                { success: false, message: "Category not found" },
                { status: 404 }
            );
        }

        // Check if any products are using this category
        const productsCount = await Product.countDocuments({ category: id });
        if (productsCount > 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Cannot delete category because it is used by ${productsCount} product(s). Please update or delete those products first.`,
                },
                { status: 400 }
            );
        }

        // Delete image from R2 if it exists
        if (category.image && category.image.imageKey) {
            try {
                await deleteFromR2(category.image.imageKey);
            } catch (imgError) {
                console.error("Failed to delete category image from R2:", imgError);
                // Continue with category deletion even if image deletion fails
            }
        }

        await Category.findByIdAndDelete(id);

        return NextResponse.json(
            { success: true, message: "Category deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete category error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to delete category" },
            { status: 500 }
        );
    }
}
