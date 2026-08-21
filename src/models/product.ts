import mongoose from "mongoose";
import "@/models/Category";

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        images: [
            new mongoose.Schema(
                {
                    url: {
                        type: String,
                        required: true,
                    },

                    imageKey: {
                        type: String,
                        required: true,
                    },
                },
                { _id: false }
            ),
        ],

        shortDescription: {
            type: String,
            required: true,
            trim: true,
        },

        longDescription: {
            type: String,
            required: true,
        },

        specifications: [
            new mongoose.Schema(
                {
                    key: {
                        type: String,
                        trim: true,
                    },

                    value: {
                        type: String,
                        trim: true,
                    },
                },
                { _id: false }
            ),
        ],

        metaTitle: {
            type: String,
            trim: true,
        },

        metaDescription: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);

export default Product;