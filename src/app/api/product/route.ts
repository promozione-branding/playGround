import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import Product from "@/models/product";
import Category from "@/models/Category";
import { uploadToR2 } from "@/utils/uploadToR2";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET ALL PRODUCTS
export async function GET() {
    try {
        await connectDB();

        const products = await Product.find()
            .populate({
                path: "category",
                select: "name slug",
                strictPopulate: false,
            })
            .sort({
                createdAt: -1,
            });

        return NextResponse.json(
            {
                success: true,
                count: products.length,
                products,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Get products error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch products",
                error: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}


// CREATE PRODUCT
export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();

        // -----------------------------
        // PRODUCT DETAILS
        // -----------------------------

        const productName = (
            formData.get("productName") as string
        )?.trim();

        const slug = (
            formData.get("slug") as string
        )?.trim().toLowerCase();

        const category = (
            formData.get("category") as string
        )?.trim();

        const shortDescription = (
            formData.get("shortDescription") as string
        )?.trim();

        const longDescription = (
            formData.get("longDescription") as string
        )?.trim();

        const metaTitle = (
            formData.get("metaTitle") as string
        )?.trim();

        const metaDescription = (
            formData.get("metaDescription") as string
        )?.trim();


        // -----------------------------
        // SPECIFICATIONS
        // -----------------------------

        let specifications = [];

        try {
            specifications = JSON.parse(
                (formData.get("specifications") as string) || "[]"
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


        // -----------------------------
        // REQUIRED FIELD VALIDATION
        // -----------------------------

        if (
            !productName ||
            !slug ||
            !category ||
            !shortDescription ||
            !longDescription
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Product name, slug, category, short description and long description are required",
                },
                { status: 400 }
            );
        }


        // -----------------------------
        // CHECK CATEGORY EXISTS
        // -----------------------------

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


        // -----------------------------
        // CHECK DUPLICATE SLUG
        // -----------------------------

        const existingProduct = await Product.findOne({
            slug,
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


        // -----------------------------
        // GET MULTIPLE IMAGES
        // -----------------------------

        const files = formData.getAll("images");

        if (!files || files.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "At least one product image is required",
                },
                { status: 400 }
            );
        }


        // -----------------------------
        // UPLOAD IMAGES TO R2
        // -----------------------------

        const uploadedImages = [];

        for (const file of files) {

            if (!(file instanceof File)) {
                continue;
            }

            const bytes = await file.arrayBuffer();

            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const extension =
                file.name
                    .split(".")
                    .pop()
                    ?.toLowerCase() || "jpg";

            const fileName =
                `${Date.now()}-${crypto.randomUUID()}.${extension}`;


            // Upload and optimize image
            const uploadedImage = await uploadToR2({
                file: buffer,
                folder: "products",
                fileName,
                contentType: file.type,
            });


            uploadedImages.push({
                url: uploadedImage.url,
                imageKey: uploadedImage.key,
            });
        }


        // -----------------------------
        // CHECK IMAGE UPLOAD
        // -----------------------------

        if (uploadedImages.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image upload failed",
                },
                { status: 400 }
            );
        }


        // -----------------------------
        // CREATE PRODUCT IN MONGODB
        // -----------------------------

        const product = await Product.create({
            productName,
            slug,
            category,

            images: uploadedImages,

            shortDescription,
            longDescription,

            specifications,

            metaTitle: metaTitle || "",
            metaDescription: metaDescription || "",
        });


        // -----------------------------
        // SUCCESS RESPONSE
        // -----------------------------

        return NextResponse.json(
            {
                success: true,
                message: "Product created successfully",
                product,
            },
            { status: 201 }
        );

    } catch (error) {

        console.error("Create product error:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to create product",
            },
            { status: 500 }
        );
    }
}