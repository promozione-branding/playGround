import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Product from "@/models/product";
import Category from "@/models/Category";
import { uploadToR2 } from "@/app/utils/uploadToR2";
import { deleteFromR2 } from "@/app/utils/deleteFromR2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        const product = await Product.findOne({
            slug: slug.toLowerCase(),
        }).populate({
            path: "category",
            select: "name slug",
            strictPopulate: false,
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get product error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch product",
            },
            { status: 500 }
        );
    }
}


// ==========================================
// UPDATE PRODUCT
// ==========================================

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    let newUploadedImages: { url: string; imageKey: string }[] = [];

    try {
        await connectDB();

        const { slug: currentSlug } = await params;

        // Find current product
        const product = await Product.findOne({
            slug: currentSlug.toLowerCase(),
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }

        const formData = await req.formData();


        // ==========================================
        // PRODUCT DETAILS
        // ==========================================

        const productName =
            (formData.get("productName") as string | null)?.trim();

        const newSlug =
            (formData.get("slug") as string | null)
                ?.trim()
                .toLowerCase();

        const category =
            (formData.get("category") as string | null)?.trim();

        const shortDescription =
            (formData.get("shortDescription") as string | null)?.trim();

        const longDescription =
            (formData.get("longDescription") as string | null)?.trim();

        const metaTitle =
            (formData.get("metaTitle") as string | null)?.trim();

        const metaDescription =
            (formData.get("metaDescription") as string | null)?.trim();


        // ==========================================
        // CATEGORY VALIDATION
        // ==========================================

        if (category) {
            const categoryExists = await Category.findById(category);

            if (!categoryExists) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Selected category does not exist",
                    },
                    { status: 400 }
                );
            }

            product.category = category;
        }


        // ==========================================
        // CHECK SLUG
        // ==========================================

        if (newSlug && newSlug !== currentSlug.toLowerCase()) {
            const existingProduct = await Product.findOne({
                slug: newSlug,
                _id: { $ne: product._id },
            });

            if (existingProduct) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "A product with this slug already exists",
                    },
                    { status: 400 }
                );
            }
        }


        // ==========================================
        // SPECIFICATIONS
        // ==========================================

        let specifications = product.specifications;

        const specificationsInput =
            formData.get("specifications");

        if (specificationsInput) {
            try {
                specifications = JSON.parse(
                    specificationsInput as string
                );
            } catch {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Invalid specifications format",
                    },
                    { status: 400 }
                );
            }
        }


        // ==========================================
        // HANDLE DELETED KEYS INPUT
        // ==========================================

        let requestedDeleteKeys: string[] = [];

        const deletedKeysInput = formData.get("deletedImageKeys");
        if (deletedKeysInput) {
            try {
                requestedDeleteKeys = JSON.parse(deletedKeysInput as string);
            } catch {
                requestedDeleteKeys = [deletedKeysInput as string];
            }
        } else {
            const singleKey = formData.get("deletedImageKey") as string;
            if (singleKey) {
                requestedDeleteKeys = [singleKey];
            }
        }


        // ==========================================
        // SECURITY CHECK: VERIFY KEYS BELONG TO THIS PRODUCT
        // ==========================================

        const productKeys = (product.images || []).map(
            (img: { imageKey: string }) => img.imageKey
        );

        // Only allow deleting keys that actually belong to this product
        const validDeleteKeys = requestedDeleteKeys.filter((key) =>
            productKeys.includes(key)
        );

        // Filter out deleted keys directly from product.images
        const existingImages = (product.images || []).filter(
            (img: { imageKey: string }) => !validDeleteKeys.includes(img.imageKey)
        );


        // ==========================================
        // UPLOAD NEW IMAGES FIRST
        // ==========================================

        const files = formData.getAll("newImages");

        for (const file of files) {

            if (!(file instanceof File)) {
                continue;
            }

            const bytes = await file.arrayBuffer();

            const buffer = Buffer.from(bytes);

            const extension =
                file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase() || "jpg";

            const fileName =
                `${Date.now()}-${crypto.randomUUID()}.${extension}`;


            const uploadedImage = await uploadToR2({
                file: buffer,
                folder: "products",
                fileName,
                contentType: file.type,
            });


            newUploadedImages.push({
                url: uploadedImage.url,
                imageKey: uploadedImage.key,
            });
        }


        // ==========================================
        // FINAL IMAGE LIST & VALIDATION
        // ==========================================

        const finalImages = [
            ...existingImages,
            ...newUploadedImages,
        ];

        // Ensure product has at least one image BEFORE deleting anything from R2
        if (finalImages.length === 0) {
            // Clean up newly uploaded images if validation fails
            if (newUploadedImages.length > 0) {
                await Promise.allSettled(
                    newUploadedImages.map((img) => deleteFromR2(img.imageKey))
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Product must have at least one image",
                },
                { status: 400 }
            );
        }


        // ==========================================
        // DELETE REMOVED IMAGES FROM R2 (AFTER VALIDATION)
        // ==========================================

        if (validDeleteKeys.length > 0) {
            const deletionResults = await Promise.allSettled(
                validDeleteKeys.map((key) => deleteFromR2(key))
            );

            const failedDeletions = deletionResults.filter(
                (result) => result.status === "rejected"
            );

            // Do NOT update MongoDB if R2 deletion failed
            if (failedDeletions.length > 0) {
                console.error(
                    "Some R2 image deletions failed:",
                    failedDeletions
                );

                // Clean up newly uploaded images since update failed
                if (newUploadedImages.length > 0) {
                    await Promise.allSettled(
                        newUploadedImages.map((img) => deleteFromR2(img.imageKey))
                    );
                }

                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Some images could not be deleted from Cloudflare R2. Product was not updated.",
                    },
                    { status: 500 }
                );
            }
        }


        // ==========================================
        // UPDATE PRODUCT IN MONGODB
        // ==========================================

        if (productName) {
            product.productName = productName;
        }

        if (newSlug) {
            product.slug = newSlug;
        }

        if (shortDescription !== undefined) {
            product.shortDescription = shortDescription;
        }

        if (longDescription !== undefined) {
            product.longDescription = longDescription;
        }

        if (metaTitle !== undefined) {
            product.metaTitle = metaTitle;
        }

        if (metaDescription !== undefined) {
            product.metaDescription = metaDescription;
        }

        product.specifications = specifications;

        product.images = finalImages;


        // ==========================================
        // SAVE
        // ==========================================

        await product.save();


        // ==========================================
        // SUCCESS
        // ==========================================

        return NextResponse.json(
            {
                success: true,
                message: "Product updated successfully",
                product,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Update product error:", error);

        // Clean up newly uploaded images if an unhandled error occurs
        if (newUploadedImages.length > 0) {
            await Promise.allSettled(
                newUploadedImages.map((img) => deleteFromR2(img.imageKey))
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to update product",
            },
            { status: 500 }
        );
    }
}


// ==========================================
// DELETE PRODUCT
// ==========================================

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await params;

        // Find product
        const product = await Product.findOne({
            slug: slug.toLowerCase(),
        });

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                { status: 404 }
            );
        }


        // ==========================================
        // GET IMAGES SAFELY
        // ==========================================

        const imagesToDelete = (product.images || []).filter(
            (image: { imageKey: string }) => image?.imageKey
        );


        // ==========================================
        // DELETE ALL IMAGES FROM R2
        // ==========================================

        if (imagesToDelete.length > 0) {

            const deletionResults = await Promise.allSettled(
                imagesToDelete.map((image: { imageKey: string }) =>
                    deleteFromR2(image.imageKey)
                )
            );

            const failedDeletions = deletionResults.filter(
                (result) => result.status === "rejected"
            );


            // Do NOT delete MongoDB product
            // if R2 deletion failed
            if (failedDeletions.length > 0) {

                console.error(
                    "Some R2 image deletions failed:",
                    failedDeletions
                );

                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Some images could not be deleted from Cloudflare R2. Product was not deleted.",
                    },
                    { status: 500 }
                );
            }
        }


        // ==========================================
        // DELETE PRODUCT FROM MONGODB
        // ==========================================

        await Product.deleteOne({
            _id: product._id,
        });


        // ==========================================
        // SUCCESS
        // ==========================================

        return NextResponse.json(
            {
                success: true,
                message:
                    "Product and all images deleted successfully",
            },
            { status: 200 }
        );

    } catch (error) {

        console.error("Delete product error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete product",
            },
            { status: 500 }
        );
    }
}
