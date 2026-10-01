"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Clock,
    User,
    Calendar,
    Tag,
} from "lucide-react";

interface Blog {
    _id: string;
    title: string;
    slug: string;
    date: string;
    metaTitle: string;
    metaDescription: string;
    content: string;
    thumbnail?: {
        url: string;
        imageKey: string;
    };
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

interface BlogApiResponse {
    success: boolean;
    blog: Blog;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const formatDate = (dateString: string) => {
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

const getReadTime = (content: string) => {
    if (!content) {
        return "1 min read";
    }

    const plainText = content
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/\s+/g, " ")
        .trim();

    const words = plainText
        .split(/\s+/)
        .filter(Boolean).length;

    const minutes = Math.max(
        1,
        Math.ceil(words / 200)
    );

    return `${minutes} min read`;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export default function BlogDetailContent() {
    const params = useParams();
    

    const id = params?.id as string;
    console.log(id)

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /* ---------------------------------------------------------------------- */
    /* Fetch Single Blog                                                       */
    /* ---------------------------------------------------------------------- */

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `/api/blog/${id}`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );
                console.log(response)

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch blog"
                    );
                }

                const data: BlogApiResponse =
                    await response.json();

                if (!data.success || !data.blog) {
                    throw new Error(
                        "Blog not found"
                    );
                }

                console.log(data)

                setBlog(data.blog);
            } catch (error) {
                console.error(
                    "Error fetching blog:",
                    error
                );

                setError(
                    "Unable to load this blog."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    /* ---------------------------------------------------------------------- */
    /* Loading                                                                */
    /* ---------------------------------------------------------------------- */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f8fa] px-6 py-20 md:px-12">
                <div className="mx-auto max-w-6xl animate-pulse">

                    <div className="mb-8 h-5 w-40 rounded bg-[#d8e9ed]" />

                    <div className="mb-5 h-7 w-24 rounded-full bg-[#d8e9ed]" />

                    <div className="mb-4 h-16 w-3/4 rounded bg-[#d8e9ed]" />

                    <div className="mb-10 h-5 w-1/2 rounded bg-[#d8e9ed]" />

                    <div className="aspect-[16/9] w-full rounded-3xl bg-[#d8e9ed]" />

                </div>
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Error / Not Found                                                      */
    /* ---------------------------------------------------------------------- */

    if (error || !blog) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f0f8fa] px-6">
                <div className="text-center">

                    <h1 className="text-6xl font-bold text-[#0a192f]">
                        404
                    </h1>

                    <h2 className="mt-4 text-2xl font-bold text-[#0a192f]">
                        Blog Not Found
                    </h2>

                    <p className="mt-3 text-[#3b596d]">
                        {error ||
                            "The blog you are looking for does not exist."}
                    </p>

                    <Link
                        href="/blogs"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0284c7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a192f]"
                    >
                        <ArrowLeft size={16} />
                        Back to All Blogs
                    </Link>

                </div>
            </div>
        );
    }

    /* ---------------------------------------------------------------------- */
    /* Main                                                                    */
    /* ---------------------------------------------------------------------- */

    return (
        <div className="min-h-screen bg-[#f0f8fa] px-6 pb-20 pt-10 font-quicksand text-[#0c2333] antialiased selection:bg-[#0284c7] selection:text-white md:px-12">

            <div className="mx-auto max-w-6xl">

                {/* Back Link */}
                <Link
                    href="/blogs"
                    className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] transition-colors hover:text-[#0a192f]"
                >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

                    <span>
                        Back to All Journals
                    </span>
                </Link>

                {/* Category & Metadata */}
                <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#0284c7]">

                    <span className="flex items-center gap-1.5 rounded-full bg-[#e0f2fe] px-3 py-1 text-[#0284c7]">
                        <Tag className="h-3.5 w-3.5" />
                        BLOG
                    </span>

                    <span className="flex items-center gap-1 text-[#3b596d]">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(blog.date)}
                    </span>

                    <span className="flex items-center gap-1 text-[#3b596d]">
                        <Clock className="h-3.5 w-3.5" />
                        {getReadTime(blog.content)}
                    </span>

                </div>

                {/* Title */}
                <h1 className="mb-6 whitespace-pre-line text-3xl font-bold uppercase leading-tight text-[#0a192f] md:text-5xl lg:text-6xl">
                    {blog.title}
                </h1>

                {/* Meta Description */}
                {blog.metaDescription && (
                    <p className="mb-8 max-w-4xl text-base leading-7 text-[#3b596d] md:text-lg">
                        {blog.metaDescription}
                    </p>
                )}

                {/* Author */}
                <div className="mb-8 flex items-center justify-between border-y border-cyan-900/10 py-4 text-sm font-semibold text-[#3b596d]">

                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-[#0284c7]" />

                        <span>
                            Written by{" "}
                            <strong className="text-[#0a192f]">
                                ToyPark Team
                            </strong>
                        </span>
                    </div>

                </div>

                {/* Main Image */}
                {blog.thumbnail?.url && (
                    <div className="relative mb-12 aspect-[16/10] w-full overflow-hidden rounded-3xl shadow-xl md:aspect-[16/9]">

                        <Image
                            src={blog.thumbnail.url}
                            alt={blog.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 1200px"
                            className="object-cover object-center"
                        />

                    </div>
                )}

                {/* Summary */}
                {blog.metaDescription && (
                    <div className="mb-10 rounded-r-2xl border-l-4 border-[#0284c7] bg-[#e3f2f7] p-6 text-lg font-semibold leading-relaxed text-[#0a192f] md:text-xl">
                        &quot;{blog.metaDescription}&quot;
                    </div>
                )}

                {/* Blog Content */}
                <article className="mb-16 text-base font-medium leading-relaxed text-[#3b596d] md:text-lg">

                    <div
                        className="
                           jodit-content
                        "
                        dangerouslySetInnerHTML={{
                            __html: blog.content,
                        }}
                    />

                </article>

            </div>
        </div>
    );
}