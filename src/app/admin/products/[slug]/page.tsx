"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
    Package,
    Link as LinkIcon,
    Plus,
    Trash2,
    UploadCloud,
    ArrowLeft,
    Save,
    Loader2,
} from "lucide-react";

// Dynamically import JoditEditor for Next.js SSR compatibility
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

interface ProductImage {
    url: string;
    imageKey: string;
}

interface Specification {
    key: string;
    value: string;
}

interface CategoryItem {
    _id: string;
    name: string;
    slug: string;
}

interface Product {
    _id: string;
    productName: string;
    slug: string;
    category?: CategoryItem | string;
    images: ProductImage[];
    shortDescription: string;
    longDescription: string;
    specifications: Specification[];
    metaTitle?: string;
    metaDescription?: string;
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

export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();

    const slug = params.slug as string;

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    // ==========================================
    // LOADING STATES
    // ==========================================

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // ==========================================
    // PRODUCT FIELDS
    // ==========================================

    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [slugValue, setSlugValue] = useState("");
    const [isSlugCustom, setIsSlugCustom] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setProductName(val);

        if (!isSlugCustom) {
            setSlugValue(
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
            setSlugValue(
                productName
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/[\s_-]+/g, "-")
                    .replace(/^-+|-+$/g, "")
            );
        } else {
            setSlugValue(val);
            setIsSlugCustom(true);
        }
    };

    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");

    const shortDescRef = useRef(null);
    const longDescRef = useRef(null);

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

    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get("/api/category");
                if (data.success) {
                    setCategories(data.categories || []);
                }
            } catch (error) {
                console.error("Get categories error:", error);
            }
        };
        getCategories();
    }, []);

    // ==========================================
    // SPECIFICATIONS
    // ==========================================

    const [specifications, setSpecifications] = useState<Specification[]>([
        {
            key: "",
            value: "",
        },
    ]);

    // ==========================================
    // EXISTING R2 IMAGES
    // ==========================================

    const [initialImages, setInitialImages] = useState<ProductImage[]>([]);
    const [existingImages, setExistingImages] = useState<ProductImage[]>([]);

    // ==========================================
    // NEW IMAGES
    // ==========================================

    const [newImages, setNewImages] = useState<NewImage[]>([]);

    // ==========================================
    // FETCH PRODUCT
    // ==========================================

    const getProduct = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(`/api/product/${slug}`);

            if (!data.success) {
                toast.error(data.message || "Failed to fetch product");
                return;
            }

            const product: Product = data.product;

            setProductName(product.productName || "");
            setSlugValue(product.slug || "");

            // Set category ID (whether populated object or string ID)
            if (product.category) {
                const rawCat = product.category;
                const catId = typeof rawCat === "object" && rawCat !== null ? String(rawCat._id) : String(rawCat);
                setCategory(catId || "");
            }

            setShortDescription(product.shortDescription || "");
            setLongDescription(product.longDescription || "");

            setMetaTitle(product.metaTitle || "");
            setMetaDescription(product.metaDescription || "");

            setInitialImages(product.images || []);
            setExistingImages(product.images || []);

            setSpecifications(
                product.specifications?.length
                    ? product.specifications
                    : [
                          {
                              key: "",
                              value: "",
                          },
                      ]
            );
        } catch (error) {
            console.error("Get product error:", error);

            toast.error(
                axios.isAxiosError(error)
                    ? error.response?.data?.message ||
                          "Failed to fetch product"
                    : "Failed to fetch product"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            getProduct();
        }
    }, [slug]);

    // ==========================================
    // SPECIFICATIONS
    // ==========================================

    const handleSpecificationChange = (
        index: number,
        field: "key" | "value",
        value: string
    ) => {
        setSpecifications((previous) =>
            previous.map((spec, i) =>
                i === index
                    ? {
                          ...spec,
                          [field]: value,
                      }
                    : spec
            )
        );
    };

    const addSpecification = () => {
        const last = specifications[specifications.length - 1];

        if (last && (!last.key.trim() || !last.value.trim())) {
            toast.error("Please fill the previous specification first");
            return;
        }

        setSpecifications((previous) => [
            ...previous,
            {
                key: "",
                value: "",
            },
        ]);
    };

    const removeSpecification = (index: number) => {
        setSpecifications((previous) =>
            previous.filter((_, i) => i !== index)
        );
    };

    // ==========================================
    // REMOVE EXISTING R2 IMAGE
    // ==========================================

    const removeExistingImage = (index: number) => {
        setExistingImages((previous) =>
            previous.filter((_, i) => i !== index)
        );
    };

    // ==========================================
    // ADD NEW IMAGES
    // ==========================================

    const handleNewImages = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(event.target.files || []);

        if (!files.length) return;

        const imageFiles: NewImage[] = files.map((file) => {
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

                    setNewImages((previous) =>
                        previous.map((item) =>
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

        setNewImages((previous) => [
            ...previous,
            ...imageFiles,
        ]);

        // Allow selecting same file again
        event.target.value = "";
    };

    // ==========================================
    // REMOVE NEW IMAGE
    // ==========================================

    const removeNewImage = (index: number) => {
        setNewImages((previous) => {
            const image = previous[index];

            if (image?.preview) {
                URL.revokeObjectURL(image.preview);
            }

            return previous.filter((_, i) => i !== index);
        });
    };

    // ==========================================
    // SUBMIT UPDATE
    // ==========================================

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (!productName.trim()) {
            toast.error("Product name is required");
            return;
        }

        let targetSlug = slugValue.trim();
        if (!targetSlug && productName.trim()) {
            targetSlug = productName
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setSlugValue(targetSlug);
        }

        if (!targetSlug) {
            toast.error("Product slug is required");
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

        // At least one image must remain/add
        if (
            existingImages.length === 0 &&
            newImages.length === 0
        ) {
            toast.error("Product must have at least one image");
            return;
        }

        try {
            setUpdating(true);

            const formData = new FormData();

            // ==========================================
            // PRODUCT DETAILS
            // ==========================================

            formData.append(
                "productName",
                productName.trim()
            );

            formData.append(
                "slug",
                slugValue.trim().toLowerCase()
            );

            if (category) {
                formData.append("category", category);
            }

            formData.append(
                "shortDescription",
                shortDescription.trim()
            );

            formData.append(
                "longDescription",
                longDescription
            );

            formData.append(
                "metaTitle",
                metaTitle.trim()
            );

            formData.append(
                "metaDescription",
                metaDescription.trim()
            );

            // ==========================================
            // SPECIFICATIONS
            // ==========================================

            const cleanedSpecifications =
                specifications.filter(
                    (spec) =>
                        spec.key.trim() ||
                        spec.value.trim()
                );

            formData.append(
                "specifications",
                JSON.stringify(cleanedSpecifications)
            );

            // ==========================================
            // FIND DELETED EXISTING IMAGES
            // ==========================================

            const currentImageKeys = new Set(
                existingImages.map((image) => image.imageKey)
            );

            const deletedImageKeys = initialImages
                .filter((image) => !currentImageKeys.has(image.imageKey))
                .map((image) => image.imageKey);

            // ==========================================
            // SEND DELETED IMAGE KEYS
            // ==========================================

            if (deletedImageKeys.length > 0) {
                formData.append(
                    "deletedImageKeys",
                    JSON.stringify(deletedImageKeys)
                );
            }

            // ==========================================
            // SEND NEW IMAGES
            // ==========================================

            newImages.forEach((image) => {
                formData.append(
                    "newImages",
                    image.file
                );
            });

            // ==========================================
            // API REQUEST
            // ==========================================

            const { data } = await axios.put(
                `/api/product/${slug}`,
                formData
            );

            if (!data.success) {
                toast.error(
                    data.message ||
                        "Failed to update product"
                );
                return;
            }

            toast.success(
                "Product updated successfully"
            );

            // Cleanup previews
            newImages.forEach((image) => {
                if (image.preview) {
                    URL.revokeObjectURL(
                        image.preview
                    );
                }
            });

            router.push("/admin/products");
        } catch (error) {
            console.error(
                "Update product error:",
                error
            );

            toast.error(
                axios.isAxiosError(error)
                    ? error.response?.data?.message ||
                          "Update failed"
                    : "Update failed"
            );
        } finally {
            setUpdating(false);
        }
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-700">
                    <Loader2
                        size={24}
                        className="animate-spin"
                    />
                    <span>
                        Loading product...
                    </span>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-gray-100">
            <main className="max-w-6xl mx-auto p-4 md:p-8">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h1 className="text-3xl font-bold text-black">
                            Edit Product
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Update your Toy Park product
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/admin/products"
                            )
                        }
                        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl shadow-sm p-5 md:p-8 space-y-8"
                >

                    {/* ==========================================
                        BASIC INFORMATION
                    ========================================== */}

                    <section>

                        <h2 className="text-lg font-bold text-black mb-5">
                            Product Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* PRODUCT NAME */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Name
                                </label>

                                <div className="relative">
                                    <Package
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={handleNameChange}
                                        placeholder="Enter product name"
                                        className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-black outline-none focus:border-black"
                                    />
                                </div>
                            </div>

                            {/* SLUG */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Slug
                                </label>

                                <div className="relative">
                                    <LinkIcon
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        value={slugValue}
                                        onChange={handleSlugChange}
                                        placeholder="product-slug"
                                        className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-black outline-none focus:border-black"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-400 mt-1.5 flex items-center gap-1">
                                    <span>💡</span>
                                    <span>Auto-syncs with name. Type a custom slug to override, or clear to reset.</span>
                                </p>
                            </div>

                            {/* CATEGORY */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-black outline-none focus:border-black bg-white"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                    </section>

                    {/* ==========================================
                        DESCRIPTIONS
                    ========================================== */}

                    <section>

                        <h2 className="text-lg font-bold text-black mb-5">
                            Descriptions
                        </h2>

                        <div className="space-y-5">

                            {/* SHORT DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Short Description
                                </label>
                                <div className="rounded-lg overflow-hidden border border-gray-300" data-lenis-prevent>
                                    <JoditEditor
                                        ref={shortDescRef}
                                        value={shortDescription}
                                        config={shortDescConfig}
                                        onBlur={(newContent) => setShortDescription(newContent)}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>

                            {/* LONG DESCRIPTION */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Long Description
                                </label>
                                <div className="rounded-lg overflow-hidden border border-gray-300" data-lenis-prevent>
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

                    </section>

                    {/* ==========================================
                        SEO
                    ========================================== */}

                    <section>

                        <h2 className="text-lg font-bold text-black mb-5">
                            SEO
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Meta Title
                                </label>

                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) =>
                                        setMetaTitle(
                                            e.target.value
                                        )
                                    }
                                    placeholder="SEO meta title"
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-black outline-none focus:border-black"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Meta Description
                                </label>

                                <textarea
                                    rows={3}
                                    value={
                                        metaDescription
                                    }
                                    onChange={(e) =>
                                        setMetaDescription(
                                            e.target.value
                                        )
                                    }
                                    placeholder="SEO meta description"
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 text-black outline-none focus:border-black resize-none"
                                />
                            </div>

                        </div>

                    </section>

                    {/* ==========================================
                        SPECIFICATIONS
                    ========================================== */}

                    <section>

                        <div className="flex items-center justify-between mb-5">

                            <h2 className="text-lg font-bold text-black">
                                Specifications
                            </h2>

                            <button
                                type="button"
                                onClick={
                                    addSpecification
                                }
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-90"
                            >
                                <Plus size={17} />
                                Add Specification
                            </button>

                        </div>

                        <div className="space-y-3">

                            {specifications.map(
                                (
                                    specification,
                                    index
                                ) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3"
                                    >

                                        <input
                                            type="text"
                                            value={
                                                specification.key
                                            }
                                            onChange={(e) =>
                                                handleSpecificationChange(
                                                    index,
                                                    "key",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Material"
                                            className="border border-gray-300 rounded-lg py-3 px-4 text-black outline-none focus:border-black"
                                        />

                                        <input
                                            type="text"
                                            value={
                                                specification.value
                                            }
                                            onChange={(e) =>
                                                handleSpecificationChange(
                                                    index,
                                                    "value",
                                                    e.target
                                                        .value
                                                )
                                            }
                                            placeholder="e.g. Plastic"
                                            className="border border-gray-300 rounded-lg py-3 px-4 text-black outline-none focus:border-black"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSpecification(
                                                    index
                                                )
                                            }
                                            className="bg-red-50 text-red-600 px-4 rounded-lg hover:bg-red-100"
                                        >
                                            <Trash2
                                                size={18}
                                            />
                                        </button>

                                    </div>
                                )
                            )}
                        </div>
                    </section>
                    {/* ==========================================
                        EXISTING IMAGES
                    ========================================== */}
                    <section>
                        <div className="flex items-center justify-between mb-5">

                            <div>
                                <h2 className="text-lg font-bold text-black">
                                    Product Images
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Existing images are stored
                                    in Cloudflare R2.
                                </p>
                            </div>

                        </div>

                        {existingImages.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                {existingImages.map(
                                    (
                                        image,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                image.imageKey
                                            }
                                            className="relative group rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                                        >

                                            <div className="aspect-square">

                                                <img
                                                    src={
                                                        image.url
                                                    }
                                                    alt={`Product image ${
                                                        index +
                                                        1
                                                    }`}
                                                    className="w-full h-full object-cover"
                                                />

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingImage(
                                                        index
                                                    )
                                                }
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600"
                                                title="Remove image"
                                            >
                                                <Trash2
                                                    size={16}
                                                />
                                            </button>

                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                                                Existing image
                                            </div>

                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className="border border-dashed border-red-300 bg-red-50 rounded-xl p-6 text-center">
                                <p className="text-red-600 font-medium">
                                    No existing images
                                </p>
                            </div>
                        )}
                    </section>

                    {/* ==========================================
                        ADD NEW IMAGES
                    ========================================== */}
                    <section>
                        <h2 className="text-lg font-bold text-black mb-5">
                            Add New Images
                        </h2>
                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-black transition">
                            <UploadCloud
                                size={38}
                                className="text-gray-500 mb-3"
                            />
                            <p className="font-semibold text-gray-700">
                                Click to upload images
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                You can select multiple images
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={
                                    handleNewImages
                                }
                                className="hidden"
                            />
                        </label>
                        {/* NEW IMAGE PREVIEWS */}
                        {newImages.length > 0 && (
                            <div className="mt-5">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    New Images
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                                    {newImages.map(
                                        (
                                            image,
                                            index
                                        ) => (
                                            <div
                                                key={`${image.file.name}-${index}`}
                                                className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                                            >

                                                <div className="aspect-square relative">

                                                    <img
                                                        src={
                                                            image.preview
                                                        }
                                                        alt={
                                                            image.file
                                                                .name
                                                        }
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {image.stats && (
                                                        <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-1 rounded-md shadow flex items-center justify-between pointer-events-none">
                                                            <span className="text-gray-300">Orig: <span className="text-white font-semibold">{image.stats.originalSize}</span></span>
                                                            <span className="text-emerald-400 font-semibold">~{image.stats.compressedSize}</span>
                                                            <span className="bg-emerald-500/20 text-emerald-300 font-bold px-1 rounded text-[9px]">
                                                                -{image.stats.savings}%
                                                            </span>
                                                        </div>
                                                    )}

                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeNewImage(
                                                            index
                                                        )
                                                    }
                                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600"
                                                >
                                                    <Trash2
                                                        size={16}
                                                    />
                                                </button>

                                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                                                    {
                                                        image.file
                                                            .name
                                                    }
                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>

                            </div>
                        )}

                    </section>

                    {/* ==========================================
                        IMAGE COUNT
                    ========================================== */}

                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                Existing images
                            </span>
                            <span className="font-semibold text-black">
                                {existingImages.length}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <span className="text-gray-600">
                                New images
                            </span>
                            <span className="font-semibold text-black">
                                {newImages.length}
                            </span>
                        </div>
                        <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                            <span className="font-semibold text-gray-800">
                                Final image count
                            </span>
                            <span className="font-bold text-black">
                                {existingImages.length +
                                    newImages.length}
                            </span>
                        </div>
                    </div>

                    {/* ==========================================
                        SUBMIT
                    ========================================== */}
                    <button
                        type="submit"
                        disabled={updating}
                        className="w-full bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {updating ? (
                            <>
                                <Loader2
                                    size={20}
                                    className="animate-spin"
                                />
                                Updating Product...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Update Product
                            </>
                        )}

                    </button>

                </form>

            </main>
        </div>
    );
}