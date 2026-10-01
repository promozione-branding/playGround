"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Clock,
    Compass,
    Heart,
    Smile,
} from "lucide-react";

import "swiper/css";

interface BlogThumbnail {
    url: string;
    imageKey: string;
}

interface Blog {
    _id: string;
    title: string;
    slug: string;
    date: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    thumbnail?: BlogThumbnail;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

interface BlogApiResponse {
    success: boolean;
    count: number;
    blogs: Blog[];
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const stripHtml = (html: string): string => {
    if (!html) return "";

    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/\s+/g, " ")
        .trim();
};

const getSummary = (blog: Blog): string => {
    const contentText = stripHtml(blog.content || "");

    const summary =
        contentText ||
        blog.metaDescription ||
        "Read the latest insights and updates from Toy Park.";

    if (summary.length <= 150) {
        return summary;
    }

    return `${summary.slice(0, 150).trim()}...`;
};

const getReadTime = (blog: Blog): string => {
    const text = stripHtml(blog.content || "");

    if (!text) {
        return "1 min read";
    }

    const words = text.split(/\s+/).filter(Boolean).length;

    const minutes = Math.max(1, Math.ceil(words / 200));

    return `${minutes} min read`;
};

const formatDate = (dateString: string): string => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

/* -------------------------------------------------------------------------- */
/* Loading Skeleton                                                           */
/* -------------------------------------------------------------------------- */

const BlogSkeleton = () => {
    return (
        <div className="overflow-hidden rounded-[28px] bg-white shadow-sm">
            <div className="h-[260px] animate-pulse bg-gray-200" />

            <div className="p-6">
                <div className="mb-4 h-4 w-24 animate-pulse rounded bg-gray-200" />

                <div className="mb-3 h-7 w-full animate-pulse rounded bg-gray-200" />

                <div className="mb-2 h-4 w-full animate-pulse rounded bg-gray-200" />

                <div className="mb-6 h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
        </div>
    );
};

/* -------------------------------------------------------------------------- */
/* Main Component                                                             */
/* -------------------------------------------------------------------------- */

export default function BlogsPageContent() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch("/api/blog", {
                    method: "GET",
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch blogs: ${response.status}`
                    );
                }

                const data: BlogApiResponse = await response.json();

                if (!data.success) {
                    throw new Error("API returned an unsuccessful response");
                }

                setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
            } catch (error) {
                console.error("Error fetching blogs:", error);

                setError(
                    "Unable to load blogs right now. Please try again later."
                );

                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

console.log(blogs)
    return (
        <main
            className="relative min-h-screen overflow-hidden bg-[#f0f8fa] text-[#0c2333]"
            style={{
                fontFamily: "var(--font-quicksand), sans-serif",
            }}
        >
            {/* ---------------------------------------------------------------- */}
            {/* Background Decorations                                          */}
            {/* ---------------------------------------------------------------- */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-20 top-20 opacity-[0.05]">
                    <Compass
                        size={220}
                        strokeWidth={1}
                    />
                </div>

                <div className="absolute right-[-40px] top-[30%] opacity-[0.05]">
                    <Smile
                        size={180}
                        strokeWidth={1}
                    />
                </div>

                <div className="absolute bottom-[10%] left-[8%] opacity-[0.05]">
                    <Heart
                        size={160}
                        strokeWidth={1}
                    />
                </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Hero                                                              */}
            {/* ---------------------------------------------------------------- */}

            <section className="relative px-5 pb-14 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-4xl">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0c2333]/10 bg-white/70 px-5 py-2 text-xs font-bold tracking-[0.18em] text-[#0c2333] backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-[#0c2333]" />

                            TOY PARK JOURNALS & INSIGHTS
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
                            TOY PARK{" "}
                            <span className="font-normal italic">
                                &quot;BLOGS&quot;
                            </span>
                        </h1>

                        <p className="mt-7 max-w-2xl text-base leading-7 text-[#0c2333]/65 sm:text-lg">
                            Explore the latest updates, ideas, insights and
                            stories from Toy Park.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------------------------------------------------------------- */}
            {/* Blog Section                                                     */}
            {/* ---------------------------------------------------------------- */}

            <section className="relative px-5 pb-24 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <BlogSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-[28px] border border-red-200 bg-white p-10 text-center shadow-sm">
                            <h2 className="text-2xl font-bold text-[#0c2333]">
                                Something went wrong
                            </h2>

                            <p className="mt-3 text-[#0c2333]/60">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0c2333] px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
                            >
                                Try Again
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && !error && blogs.length === 0 && (
                        <div className="rounded-[28px] border border-[#0c2333]/10 bg-white p-12 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f8fa]">
                                <Compass
                                    size={28}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h2 className="mt-6 text-2xl font-bold">
                                No blogs available
                            </h2>

                            <p className="mt-3 text-[#0c2333]/60">
                                Check back soon for new articles and insights.
                            </p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!loading && !error && blogs.length > 0 && (
                        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog) => {
                                const imageUrl = blog.thumbnail?.url;

                                return (
                                    <article
                                        key={blog._id}
                                        className="group overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(12,35,51,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(12,35,51,0.12)]"
                                    >
                                        {/* Image */}
                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="relative block h-[260px] overflow-hidden bg-[#e8f1f3]"
                                        >
                                            {imageUrl ? (
                                                <Image
                                                    src={imageUrl}
                                                    alt={
                                                        blog.title ||
                                                        "Toy Park Blog"
                                                    }
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-[#dfecef]">
                                                    <Compass
                                                        size={48}
                                                        strokeWidth={1}
                                                        className="text-[#0c2333]/30"
                                                    />
                                                </div>
                                            )}

                                            {/* Image Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2333]/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                                            {/* Blog Label */}
                                            <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#0c2333] shadow-sm">
                                                BLOG
                                            </div>

                                            {/* ID */}
                                            <div className="absolute bottom-5 right-5 rounded-full bg-[#0c2333]/80 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                                                #
                                                {blog._id
                                                    .slice(-4)
                                                    .toUpperCase()}
                                            </div>
                                        </Link>

                                        {/* Content */}
                                        <div className="p-6 sm:p-7">
                                            {/* Meta */}
                                            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#0c2333]/50">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <CalendarDays size={14} />

                                                    {formatDate(blog.date)}
                                                </span>

                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock size={14} />

                                                    {getReadTime(blog)}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <Link
                                                href={`/blogs/${blog.slug}`}
                                            >
                                                <h2 className="line-clamp-2 text-2xl font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-[#365d70]">
                                                    {blog.title}
                                                </h2>
                                            </Link>

                                            {/* Summary */}
                                            <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#0c2333]/60">
                                                {getSummary(blog)}
                                            </p>

                                            {/* Bottom */}
                                            <div className="mt-7 flex items-center justify-between border-t border-[#0c2333]/10 pt-5">
                                                <span className="text-xs font-medium text-[#0c2333]/40">
                                                    Toy Park
                                                </span>

                                                <Link
                                                    href={`/blogs/${blog.slug}`}
                                                    className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#0c2333]"
                                                >
                                                    Read Article

                                                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#0c2333]/15 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:bg-[#0c2333] group-hover/link:text-white">
                                                        <ArrowRight
                                                            size={15}
                                                        />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}