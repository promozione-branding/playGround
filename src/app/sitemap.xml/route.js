import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/product";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  try {
    await connectDB();

    // ==========================================
    // STATIC PAGES
    // ==========================================

    const staticPages = [
      "/",
      "/about",
      "/contact",
      "/ourstory",
      "/whoweare",
      "/partner",
      "/gallery",
      "/why-choose-us",
      "/exhibition",
      "/certification",
      "/products",
      "/blogs",
      "/returns-and-exchanges",
      "/privacy-policy",
      "/refund-and-returns",
    ];

    // ==========================================
    // GET PRODUCTS
    // ==========================================

    const products = await Product.find({}).select("slug updatedAt").lean();

    // ==========================================
    // PRODUCT PAGES
    // ==========================================

    const productPages = products
      .filter((product) => product.slug)
      .map((product) => ({
        url: `/products/${product.slug}`,
        lastModified: product.updatedAt,
      }));

    // ==========================================
    // CREATE STATIC XML
    // ==========================================

    const staticUrls = staticPages
      .map(
        (page) => `
    <url>
        <loc>${BASE_URL}${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === "/" ? "1.0" : "0.8"}</priority>
    </url>`,
      )
      .join("");

    // ==========================================
    // CREATE PRODUCT XML
    // ==========================================

    const productUrls = productPages
      .map(
        (product) => `
    <url>
        <loc>${BASE_URL}${product.url}</loc>
        ${
          product.lastModified
            ? `<lastmod>${new Date(
                product.lastModified,
              ).toISOString()}</lastmod>`
            : ""
        }
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
    </url>`,
      )
      .join("");

    // ==========================================
    // FINAL SITEMAP
    // ==========================================

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${staticUrls}
${productUrls}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);

    return new NextResponse("Failed to generate sitemap", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
