import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    image: {
        url: string;
        imageKey: string;
    };
    metaTitle?: string;
    metaDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        image: {
            url: {
                type: String,
                default: "",
            },

            imageKey: {
                type: String,
                default: "",
            },
        },

        metaTitle: {
            type: String,
            trim: true,
            default: "",
        },

        metaDescription: {
            type: String,
            trim: true,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Category: Model<ICategory> =
    mongoose.models.Category ||
    mongoose.model<ICategory>("Category", categorySchema);

export default Category;