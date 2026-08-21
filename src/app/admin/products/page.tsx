"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Package,
    Search,
    Edit,
    Trash2,
    Plus,
    Image as ImageIcon,
    Tag,
} from "lucide-react";

interface CategoryItem {
    _id: string;
    name: string;
    slug: string;
}

interface ProductImage {
    url: string;
    imageKey: string;
}

interface Product {
    _id: string;
    productName: string;
    slug: string;
    category?: CategoryItem | string;
    images: ProductImage[];
    shortDescription: string;
    longDescription: string;
    specifications: unknown[];
    metaTitle?: string;
    metaDescription?: string;
    createdAt?: string;
}

interface ProductsResponse {
    success: boolean;
    products: Product[];
    count?: number;
    message?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const getProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch("/api/product", {
                method: "GET",
                cache: "no-store",
            });

            const data: ProductsResponse = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to fetch products"
                );
            }

            setProducts(data.products || []);
        } catch (error) {
            console.error("Get products error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to fetch products"
            );
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOAD PRODUCTS
    // ==========================================

    useEffect(() => {
        getProducts();
    }, []);

    // ==========================================
    // SEARCH
    // ==========================================

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            product.productName
                ?.toLowerCase()
                .includes(query) ||
            product.slug
                ?.toLowerCase()
                .includes(query)
        );
    });

    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    const deleteProduct = async (slug: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?\n\nAll images belonging to this product will also be deleted from Cloudflare R2."
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingSlug(slug);

            const response = await fetch(
                `/api/product/${encodeURIComponent(slug)}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Failed to delete product"
                );
            }

            // Remove deleted product immediately from UI
            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product.slug !== slug
                )
            );

            alert("Product deleted successfully.");

        } catch (error) {
            console.error("Delete product error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete product"
            );
        } finally {
            setDeletingSlug(null);
        }
    };

    // ==========================================
    // LOADING STATE
    // ==========================================

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-100">

                <main className="p-6 md:p-8">

                    <div className="max-w-7xl mx-auto">

                        {/* Header skeleton */}

                        <div className="flex items-center justify-between mb-8">

                            <div>
                                <div className="h-8 w-48 bg-neutral-200 rounded-lg animate-pulse" />

                                <div className="h-4 w-64 bg-neutral-200 rounded mt-3 animate-pulse" />
                            </div>

                            <div className="h-11 w-36 bg-neutral-200 rounded-xl animate-pulse" />

                        </div>


                        {/* Search skeleton */}

                        <div className="h-12 bg-neutral-200 rounded-xl animate-pulse mb-8" />


                        {/* Product skeletons */}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm"
                                >
                                    <div className="h-64 bg-neutral-200 animate-pulse" />

                                    <div className="p-5 space-y-4">

                                        <div className="h-6 bg-neutral-200 rounded animate-pulse w-3/4" />

                                        <div className="h-4 bg-neutral-200 rounded animate-pulse w-1/2" />

                                        <div className="h-10 bg-neutral-200 rounded-xl animate-pulse" />

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </main>

            </div>
        );
    }

    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div className="min-h-screen bg-neutral-100">

            <main className="p-6 md:p-8">

                <div className="max-w-7xl mx-auto">

                    {/* ==========================================
                        HEADER
                    ========================================== */}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                        <div>

                            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
                                All Products
                            </h1>

                            <p className="text-neutral-500 mt-2">
                                Manage your Toy Park products
                            </p>

                        </div>


                        {/* ADD PRODUCT */}

                        <Link
                            href="/admin/add-product"
                            className="inline-flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-neutral-800 transition"
                        >
                            <Plus size={19} />

                            Add Product
                        </Link>

                    </div>


                    {/* ==========================================
                        SEARCH BAR
                    ========================================== */}

                    <div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-8">

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div className="relative w-full md:max-w-md">

                                <Search
                                    size={19}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full h-11 pl-11 pr-10 rounded-xl border border-neutral-200 bg-neutral-50 text-sm outline-none focus:border-black focus:bg-white transition"
                                />

                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSearchQuery("")
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                                    >
                                        ×
                                    </button>
                                )}

                            </div>


                            <div className="text-sm text-neutral-500">
                                {filteredProducts.length}{" "}
                                {filteredProducts.length === 1
                                    ? "product"
                                    : "products"}
                            </div>

                        </div>

                    </div>


                    {/* ==========================================
                        NO PRODUCTS
                    ========================================== */}

                    {filteredProducts.length === 0 ? (

                        <div className="bg-white border border-neutral-200 rounded-2xl p-12 text-center">

                            <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 flex items-center justify-center mb-5">

                                <Package
                                    size={30}
                                    className="text-neutral-500"
                                />

                            </div>


                            <h2 className="text-xl font-semibold text-neutral-900">
                                {searchQuery
                                    ? "No products found"
                                    : "No products yet"}
                            </h2>


                            <p className="text-neutral-500 mt-2">
                                {searchQuery
                                    ? `No products match "${searchQuery}".`
                                    : "Create your first Toy Park product to get started."}
                            </p>


                            {!searchQuery && (
                                <Link
                                    href="/admin/add-product"
                                    className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-neutral-800 transition"
                                >
                                    <Plus size={18} />

                                    Add Product
                                </Link>
                            )}

                        </div>

                    ) : (

                        /* ==========================================
                           PRODUCT GRID
                        ========================================== */

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                            {filteredProducts.map((product) => {
                                const firstImage =
                                    product.images?.[0]?.url;

                                const imageCount =
                                    product.images?.length || 0;

                                const isDeleting =
                                    deletingSlug === product.slug;

                                const categoryName =
                                    typeof product.category === "object"
                                        ? product.category?.name
                                        : null;

                                return (
                                    <div
                                        key={product._id}
                                        className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col justify-between"
                                    >
                                        {/* ==========================================
                                            IMAGE
                                        ========================================== */}
                                        <div className="relative h-64 bg-neutral-100 overflow-hidden">
                                            {firstImage ? (
                                                <img
                                                    src={firstImage}
                                                    alt={
                                                        product.productName ||
                                                        "Toy Park product"
                                                    }
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ImageIcon
                                                        size={50}
                                                        className="text-neutral-300"
                                                    />
                                                </div>
                                            )}

                                            {/* CATEGORY BADGE */}
                                            {categoryName ? (
                                                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md border border-white/20">
                                                    <Tag size={12} className="text-amber-400" />
                                                    {categoryName}
                                                </div>
                                            ) : (
                                                <div className="absolute top-4 left-4 bg-amber-500/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-md">
                                                    Uncategorized
                                                </div>
                                            )}

                                            {/* IMAGE COUNT */}
                                            <div className="absolute top-4 right-4 bg-black/75 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                                                <ImageIcon size={13} />
                                                {imageCount}
                                            </div>
                                        </div>

                                        {/* ==========================================
                                            CONTENT
                                        ========================================== */}
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h2 className="text-xl font-semibold text-neutral-900 line-clamp-1">
                                                    {product.productName}
                                                </h2>

                                                <p className="text-xs text-neutral-400 mt-1">
                                                    {`/${product.slug}`}
                                                </p>


                                                <p className="text-sm text-neutral-500 mt-3 line-clamp-2 min-h-[40px]">
                                                    {product.shortDescription ||
                                                        "No description available."}
                                                </p>


                                                {/* CATEGORY INFO */}
                                                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-neutral-700">
                                                    <Tag size={16} className="text-amber-500" />
                                                    <span>
                                                        Category:{" "}
                                                        <span className="text-neutral-900 font-semibold">
                                                            {categoryName || "Uncategorized"}
                                                        </span>
                                                    </span>
                                                </div>

                                                {/* IMAGE COUNT */}
                                                <div className="flex items-center gap-2 mt-2 text-sm text-neutral-500">
                                                    <ImageIcon size={16} />
                                                    <span>
                                                        {imageCount}{" "}
                                                        {imageCount === 1
                                                            ? "image"
                                                            : "images"}
                                                    </span>
                                                </div>
                                        </div>

                                        {/* ==========================================
                                                ACTION BUTTONS
                                            ========================================== */}

                                            <div className="grid grid-cols-2 gap-3 mt-5">

                                                {/* EDIT */}

                                                <Link
                                                    href={`/admin/products/${encodeURIComponent(
                                                        product.slug
                                                    )}`}
                                                    className="h-11 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center gap-2 hover:bg-neutral-200 transition font-medium"
                                                >

                                                    <Edit size={17} />

                                                    Edit

                                                </Link>


                                                {/* DELETE */}

                                                <button
                                                    type="button"
                                                    disabled={isDeleting}
                                                    onClick={() =>
                                                        deleteProduct(
                                                            product.slug
                                                        )
                                                    }
                                                    className="h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center gap-2 hover:bg-red-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                                >

                                                    <Trash2 size={17} />

                                                    {isDeleting
                                                        ? "Deleting..."
                                                        : "Delete"}

                                                </button>

                                            </div>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}