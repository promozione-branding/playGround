"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, Loader2, Tags, UploadCloud, X, Pencil, RotateCcw } from "lucide-react";

interface Category {
    _id: string;
    name: string;
    slug: string;
    image?: { url: string; imageKey: string };
    metaTitle?: string;
    metaDescription?: string;
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [imageStats, setImageStats] = useState<{
        originalSize: string;
        compressedSize: string;
        savings: number;
    } | null>(null);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/category");
            if (data.success) {
                setCategories(data.categories);
            }
        } catch (error) {
            toast.error("Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Auto-generate slug from name only when creating new category
    useEffect(() => {
        if (!editingId && name) {
            const generatedSlug = name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setSlug(generatedSlug);
        }
    }, [name, editingId]);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setSlug("");
        setMetaTitle("");
        setMetaDescription("");
        setImageFile(null);
        setImagePreview("");
        setImageStats(null);
    };

    const handleEdit = (category: Category) => {
        setEditingId(category._id);
        setName(category.name);
        setSlug(category.slug);
        setMetaTitle(category.metaTitle || "");
        setMetaDescription(category.metaDescription || "");
        setImagePreview(category.image?.url || "");
        setImageFile(null);
        setImageStats(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            // Estimate WebP compression matching sharp logic
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

                    setImageStats({
                        originalSize: formatBytes(file.size),
                        compressedSize: formatBytes(estimatedCompressedBytes),
                        savings,
                    });
                }
            };
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalSlug = slug.trim();
        if (!finalSlug && name.trim()) {
            finalSlug = name
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setSlug(finalSlug);
        }

        if (!name.trim()) {
            toast.error("Category name is required");
            return;
        }

        if (!finalSlug) {
            toast.error("Category slug is required");
            return;
        }

        if (!editingId && !imageFile) {
            toast.error("Category image is required");
            return;
        }

        try {
            setSubmitting(true);
            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("slug", finalSlug);
            formData.append("metaTitle", metaTitle.trim());
            formData.append("metaDescription", metaDescription.trim());
            if (imageFile) {
                formData.append("image", imageFile);
            } else if (editingId && !imagePreview) {
                formData.append("removeImage", "true");
            }

            if (editingId) {
                const { data } = await axios.put(`/api/category/${editingId}`, formData);
                if (data.success) {
                    toast.success("Category updated successfully!");
                    resetForm();
                    fetchCategories();
                }
            } else {
                const { data } = await axios.post("/api/category", formData);
                if (data.success) {
                    toast.success("Category created successfully!");
                    resetForm();
                    fetchCategories();
                }
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to save category"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this category?")) return;

        try {
            setDeletingId(id);
            const { data } = await axios.delete(`/api/category/${id}`);

            if (data.success) {
                toast.success("Category deleted successfully");
                setCategories((prev) => prev.filter((c) => c._id !== id));
                if (editingId === id) {
                    resetForm();
                }
            }
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Failed to delete category"
            );
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-black tracking-tight">
                        Categories
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">
                        Manage your product categories
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ADD / EDIT CATEGORY FORM */}
                <div className="lg:col-span-1">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-bold text-black flex items-center gap-2">
                                {editingId ? (
                                    <>
                                        <Pencil size={20} className="text-amber-600" />
                                        Edit Category
                                    </>
                                ) : (
                                    <>
                                        <Plus size={20} className="text-indigo-600" />
                                        Add New Category
                                    </>
                                )}
                            </h2>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-medium bg-gray-100 px-2 py-1 rounded-md transition"
                                >
                                    <RotateCcw size={12} />
                                    Cancel
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Action Figures"
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-black outline-none focus:border-indigo-600 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="action-figures"
                                    className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-black outline-none focus:border-indigo-600 transition"
                                />
                                <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                                    <span>💡</span>
                                    <span>Auto-syncs with name. Type a custom slug to override, or clear to reset.</span>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex justify-between">
                                    <span>Image</span>
                                    {!editingId && <span className="text-red-500">*Required</span>}
                                </label>
                                {imagePreview ? (
                                    <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                                        <img src={imagePreview} alt="Preview" className="w-full h-36 object-cover" />
                                        
                                        {imageStats && (
                                            <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
                                                <span className="text-gray-300">Orig: <span className="text-white font-semibold">{imageStats.originalSize}</span></span>
                                                <span className="text-gray-400">→</span>
                                                <span className="text-emerald-400 font-semibold">~{imageStats.compressedSize}</span>
                                                <span className="bg-emerald-500/20 text-emerald-300 font-bold px-1 py-0.5 rounded text-[10px]">
                                                    -{imageStats.savings}%
                                                </span>
                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                setImagePreview("");
                                                setImageStats(null);
                                            }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md hover:bg-red-600 shadow-md transition"
                                            title="Remove Image"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload image</span>
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5 text-indigo-600">
                                    SEO Options (Optional)
                                </label>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                                            Meta Title
                                        </label>
                                        <input
                                            type="text"
                                            value={metaTitle}
                                            onChange={(e) => setMetaTitle(e.target.value)}
                                            placeholder="SEO Meta Title"
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm text-black outline-none focus:border-indigo-600 transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                                            Meta Description
                                        </label>
                                        <textarea
                                            value={metaDescription}
                                            onChange={(e) => setMetaDescription(e.target.value)}
                                            placeholder="SEO Meta Description"
                                            rows={2}
                                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm text-black outline-none focus:border-indigo-600 transition resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`w-full mt-4 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md ${
                                        editingId
                                            ? "bg-amber-600 hover:bg-amber-700 shadow-amber-200"
                                            : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                                    }`}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            {editingId ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            {editingId ? <Pencil size={18} /> : <Plus size={18} />}
                                            {editingId ? "Update Category" : "Create Category"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* CATEGORIES LIST */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Tags size={20} className="text-indigo-600" />
                                <h2 className="text-lg font-bold text-black">
                                    Existing Categories
                                </h2>
                            </div>
                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                                Click any category to edit
                            </span>
                        </div>

                        {loading ? (
                            <div className="p-12 flex justify-center items-center">
                                <Loader2 size={32} className="animate-spin text-indigo-600" />
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                No categories found. Add your first category!
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {categories.map((cat) => {
                                    const isEditingThis = editingId === cat._id;
                                    return (
                                        <div
                                            key={cat._id}
                                            onClick={() => handleEdit(cat)}
                                            className={`p-5 flex items-center justify-between cursor-pointer transition ${
                                                isEditingThis
                                                    ? "bg-amber-50/70 border-l-4 border-amber-500"
                                                    : "hover:bg-slate-50 border-l-4 border-transparent"
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                {cat.image?.url ? (
                                                    <img
                                                        src={cat.image.url}
                                                        alt={cat.name}
                                                        className="w-24 h-24 rounded-xl object-cover bg-gray-100 border border-gray-200 shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
                                                        <UploadCloud size={28} className="text-gray-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-bold text-black text-lg">
                                                            {cat.name}
                                                        </h3>
                                                        {isEditingThis && (
                                                            <span className="bg-amber-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                                                Editing
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 font-medium font-mono mt-0.5">
                                                        /{cat.slug}
                                                    </p>
                                                    {cat.metaTitle && (
                                                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                                                            SEO: {cat.metaTitle}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => handleEdit(cat)}
                                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                    title="Edit Category"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cat._id)}
                                                    disabled={deletingId === cat._id}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                    title="Delete Category"
                                                >
                                                    {deletingId === cat._id ? (
                                                        <Loader2 size={18} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
