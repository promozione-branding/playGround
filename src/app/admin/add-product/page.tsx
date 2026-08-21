"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    Package,
    Plus,
    Trash2,
    UploadCloud,
    ArrowLeft,
    Save,
    Loader2,
    Tag,
} from "lucide-react";

// Dynamically import JoditEditor to avoid SSR issues in Next.js
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

interface Specification {
    key: string;
    value: string;
}

interface CategoryItem {
    _id: string;
    name: string;
    slug: string;
}

interface NewImage {
    file: File;
    preview: string;
    stats?: {
        originalSize: string;
        compressedSize: string;
        savings: number;
    };
}

export default function AddProductPage() {
    const router = useRouter();
    const shortDescRef = useRef(null);
    const longDescRef = useRef(null);

    const [submitting, setSubmitting] = useState(false);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [slug, setSlug] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    // Jodit Editor Configuration
    const shortDescConfig = useMemo(
        () => ({
            readonly: false,
            placeholder: "Brief summary of the product...",
            height: 220,
            minHeight: 180,
            maxHeight: 400,
            autoFocus: false,
            spellcheck: true,
            overflowY: "auto",
            buttons: [
                "source", "|",
                "bold", "italic", "underline", "strikethrough", "|",
                "font", "fontsize", "brush", "paragraph", "|",
                "image", "table", "link", "|",
                "align", "ul", "ol", "|",
                "undo", "redo", "hr", "|",
                "fullsize"
            ],
            statusbar: true,
            toolbarAdaptive: false,
        }),
        []
    );

    const longDescConfig = useMemo(
        () => ({
            readonly: false,
            placeholder: "Detailed product features and specifications...",
            height: 320,
            minHeight: 320,
            maxHeight: 550,
            autoFocus: false,
            spellcheck: true,
            overflowY: "auto",
            buttons: [
                "source", "|",
                "bold", "italic", "underline", "strikethrough", "|",
                "font", "fontsize", "brush", "paragraph", "|",
                "image", "table", "link", "|",
                "align", "undo", "redo", "hr", "|",
                "fullsize"
            ],
            statusbar: true,
            toolbarAdaptive: false,
        }),
        []
    );

    const [specifications, setSpecifications] = useState<Specification[]>([
        { key: "", value: "" },
    ]);
    const [images, setImages] = useState<NewImage[]>([]);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get("/api/category");
                if (data.success) {
                    setCategories(data.categories || []);
                }
            } catch (error) {
                console.error("Get categories error:", error);
                toast.error("Failed to load categories");
            }
        };
        getCategories();
    }, []);

    const [isSlugCustom, setIsSlugCustom] = useState(false);

    // AUTO SLUG GENERATION (Option 1: Smart Auto-Sync)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setProductName(val);

        if (!isSlugCustom) {
            setSlug(
                val
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/[\s_-]+/g, "-")
                    .replace(/^-+|-+$/g, "")
            );
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (!val.trim()) {
            setIsSlugCustom(false);
            setSlug(
                productName
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/[\s_-]+/g, "-")
                    .replace(/^-+|-+$/g, "")
            );
        } else {
            setSlug(val);
            setIsSlugCustom(true);
        }
    };

    // SPECIFICATIONS HANDLERS
    const handleSpecChange = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        setSpecifications((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
    };

    const addSpecification = () => {
        setSpecifications((prev) => [...prev, { key: "", value: "" }]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications((prev) => prev.filter((_, i) => i !== index));
    };

    // IMAGE HANDLERS
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const newImgs: NewImage[] = files.map((file) => {
            const previewUrl = URL.createObjectURL(file);

            // Estimate WebP compression
            const img = new Image();
            img.src = previewUrl;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;
                const maxWidth = 800;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL("image/webp", 0.75);
                    const head = "data:image/webp;base64,";
                    const base64Length = dataUrl.length - head.length;
                    const estimatedCompressedBytes = Math.round((base64Length * 3) / 4);

                    const savings = Math.max(
                        0,
                        Math.round(
                            ((file.size - estimatedCompressedBytes) / file.size) * 100
                        )
                    );

                    setImages((prev) =>
                        prev.map((item) =>
                            item.preview === previewUrl
                                ? {
                                      ...item,
                                      stats: {
                                          originalSize: formatBytes(file.size),
                                          compressedSize: formatBytes(estimatedCompressedBytes),
                                          savings,
                                      },
                                  }
                                : item
                        )
                    );
                }
            };

            return {
                file,
                preview: previewUrl,
            };
        });

        setImages((prev) => [...prev, ...newImgs]);
        e.target.value = "";
    };

    const removeImage = (index: number) => {
        setImages((prev) => {
            const img = prev[index];
            if (img?.preview) URL.revokeObjectURL(img.preview);
            return prev.filter((_, i) => i !== index);
        });
    };

    // SUBMIT FORM
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productName.trim()) {
            toast.error("Product name is required");
            return;
        }
        if (!slug.trim()) {
            toast.error("Product slug is required");
            return;
        }
        if (!category) {
            toast.error("Please select a category");
            return;
        }
        if (!shortDescription.trim()) {
            toast.error("Short description is required");
            return;
        }
        if (!longDescription.trim()) {
            toast.error("Long description is required");
            return;
        }
        if (images.length === 0) {
            toast.error("At least one product image is required");
            return;
        }

        try {
            setSubmitting(true);

            const formData = new FormData();
            formData.append("productName", productName.trim());
            formData.append("slug", slug.trim().toLowerCase());
            formData.append("category", category);
            formData.append("shortDescription", shortDescription.trim());
            formData.append("longDescription", longDescription.trim());
            formData.append("metaTitle", metaTitle.trim());
            formData.append("metaDescription", metaDescription.trim());

            const cleanedSpecs = specifications.filter(
                (s) => s.key.trim() || s.value.trim()
            );
            formData.append("specifications", JSON.stringify(cleanedSpecs));

            images.forEach((img) => {
                formData.append("images", img.file);
            });

            const { data } = await axios.post("/api/product", formData);

            if (data.success) {
                toast.success("Product created successfully!");
                router.push("/admin/products");
            } else {
                toast.error(data.message || "Failed to create product");
            }
        } catch (error) {
            console.error("Create product error:", error);
            toast.error(
                axios.isAxiosError(error)
                    ? error.response?.data?.message || "Failed to create product"
                    : "Failed to create product"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
                        <p className="text-xs text-slate-500">Create a new product in your catalog</p>
                    </div>
                </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* BASIC INFO */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Package size={18} className="text-indigo-600" />
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={handleNameChange}
                                placeholder="e.g. Wooden Learning Block Set"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={slug}
                                onChange={handleSlugChange}
                                placeholder="wooden-learning-block-set"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                required
                            />
                            <p className="text-[11px] text-slate-400 font-normal mt-1 flex items-center gap-1">
                                <span>💡</span>
                                <span>Auto-syncs with name. Type a custom slug to override, or clear to reset.</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Category *
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Short Description *
                        </label>
                        <div className="rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-500" data-lenis-prevent>
                            <JoditEditor
                                ref={shortDescRef}
                                value={shortDescription}
                                config={shortDescConfig}
                                onBlur={(newContent) => setShortDescription(newContent)}
                                onChange={() => {}}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Long Description *
                        </label>
                        <div className="rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-500" data-lenis-prevent>
                            <JoditEditor
                                ref={longDescRef}
                                value={longDescription}
                                config={longDescConfig}
                                onBlur={(newContent) => setLongDescription(newContent)}
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </div>

                {/* PRODUCT IMAGES */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <UploadCloud size={18} className="text-indigo-600" />
                        Product Images *
                    </h2>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-square">
                                <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                                
                                {img.stats && (
                                    <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-1 rounded-md shadow flex items-center justify-between pointer-events-none">
                                        <span className="text-gray-300">Orig: <span className="text-white font-semibold">{img.stats.originalSize}</span></span>
                                        <span className="text-emerald-400 font-semibold">~{img.stats.compressedSize}</span>
                                        <span className="bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded text-[9px]">
                                            -{img.stats.savings}%
                                        </span>
                                    </div>
                                )}

                                <button
                                    type="button"
                                    onClick={() => removeImage(idx)}
                                    className="absolute top-2 right-2 bg-rose-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition shadow-md"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}

                        <label className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl aspect-square flex flex-col items-center justify-center cursor-pointer transition p-4 text-center">
                            <UploadCloud className="text-slate-400 mb-1" size={24} />
                            <span className="text-xs font-semibold text-indigo-600">Upload Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageSelect}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* SPECIFICATIONS */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-base font-bold text-slate-900">Specifications</h2>
                        <button
                            type="button"
                            onClick={addSpecification}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                        >
                            <Plus size={14} /> Add Spec
                        </button>
                    </div>

                    <div className="space-y-3">
                        {specifications.map((spec, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    placeholder="Key (e.g. Material)"
                                    value={spec.key}
                                    onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Value (e.g. Premium Pine Wood)"
                                    value={spec.value}
                                    onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {specifications.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSpecification(idx)}
                                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SEO & META DATA */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Tag size={18} className="text-indigo-600" />
                        SEO & Meta Data
                    </h2>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Meta Title
                        </label>
                        <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            placeholder="e.g. Premium Wooden Learning Toys | Toy Park"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                            Meta Description & Tags
                        </label>
                        <textarea
                            rows={3}
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder="SEO description and keywords for search engines..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                        />
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg shadow-indigo-200 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                Creating Product...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Save Product
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
