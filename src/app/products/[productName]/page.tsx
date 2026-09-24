"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Star,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";

import PlayfulHeader from "../../components/Navbar";
import Footer2 from "../../components/Footer2";
import ContactForm from "../../components/ContactForm";
import PopupForm from "@/app/components/popup/PopupForm";


// ============================================================================
// TYPES
// ============================================================================

interface ProductImage {
  url: string;
  imageKey?: string;
}

interface ProductCategory {
  _id?: string;
  name?: string;
  slug?: string;
}

interface ProductSpecification {
  key: string;
  value: string;
}

interface Product {
  _id: string;
  productName: string;
  slug: string;

  category?: ProductCategory;

  images?: ProductImage[];

  shortDescription?: string;
  longDescription?: string;

  specifications?: ProductSpecification[];

  metaTitle?: string;
  metaDescription?: string;

  createdAt?: string;
  updatedAt?: string;

  __v?: number;
}

interface ProductResponse {
  success?: boolean;
  product?: Product;
  Product?: Product;
  data?: Product;
}

// ============================================================================
// WHATSAPP ICON
// ============================================================================

const WhatsAppIcon = ({
  className,
}: {
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// ============================================================================
// PLACEHOLDER IMAGE
// ============================================================================

const PLACEHOLDER_IMAGE = "/assets/placeholder.png";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ProductDetail() {
  const params = useParams();

  console.log(params);

  const slug =
    typeof params.productName === "string"
      ? params.productName
      : Array.isArray(params.productName)
        ? params.productName[0]
        : "";

  console.log("Product Name:", slug);

  // ==========================================================================
  // STATE
  // ==========================================================================

  const [product, setProduct] =
    useState<Product | null>(null);

  const [activeImage, setActiveImage] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Popup state
  const [isPopupOpen, setIsPopupOpen] =
    useState(false);

  // ==========================================================================
  // FETCH PRODUCT
  // ==========================================================================

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get<
          ProductResponse | Product
        >(`/api/product/${slug}`);

        const data = response.data;

        let productData: Product | null = null;

        // API returns product directly
        if (
          data &&
          !Array.isArray(data) &&
          "productName" in data
        ) {
          productData = data as Product;
        }

        // API returns { product: {...} }
        else if (
          !Array.isArray(data) &&
          "product" in data &&
          data.product
        ) {
          productData = data.product;
        }

        // API returns { Product: {...} }
        else if (
          !Array.isArray(data) &&
          "Product" in data &&
          data.Product
        ) {
          productData = data.Product;
        }

        // API returns { data: {...} }
        else if (
          !Array.isArray(data) &&
          "data" in data &&
          data.data &&
          typeof data.data === "object" &&
          "productName" in data.data
        ) {
          productData = data.data as Product;
        }

        if (!productData) {
          throw new Error("Product not found");
        }

        setProduct(productData);
        setActiveImage(0);
      } catch (err) {
        console.error(
          "Error fetching product:",
          err
        );

        setProduct(null);

        setError(
          "Unable to load this product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // ==========================================================================
  // PRODUCT IMAGES
  // ==========================================================================

  const productImages =
    product?.images &&
    product.images.length > 0
      ? product.images
      : [];

  // ==========================================================================
  // CURRENT IMAGE
  // ==========================================================================

  const currentImage =
    productImages[activeImage]?.url ||
    productImages[0]?.url ||
    PLACEHOLDER_IMAGE;

  // ==========================================================================
  // WHATSAPP MESSAGE
  // ==========================================================================

  const whatsappMessage = product
    ? `Hi ToyPark! I'm interested in ${product.productName}`
    : "Hi ToyPark! I'm interested in your products";

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  // ==========================================================================
  // LOADING STATE
  // ==========================================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-quicksand text-[#2D3436]">
        <PlayfulHeader />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#00C4B5]" />

            <p className="mt-4 text-sm font-bold text-gray-500">
              Loading product...
            </p>
          </div>
        </div>

        <Footer2 />
      </div>
    );
  }

  // ==========================================================================
  // ERROR STATE
  // ==========================================================================

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white font-quicksand text-[#2D3436]">
        <PlayfulHeader />

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-[#F8FAFC] p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8F9] text-2xl">
              😕
            </div>

            <h1 className="mt-5 text-2xl font-black">
              Product Not Found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error ||
                "The product you're looking for could not be found."}
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00C4B5] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#00ad9f]"
            >
              View All Products

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <Footer2 />
      </div>
    );
  }

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <div className="flex min-h-screen flex-col justify-between bg-white font-quicksand text-[#2D3436]">

      <PlayfulHeader />

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-10">

        {/* ================================================================
            BREADCRUMBS
        ================================================================ */}

        <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 sm:mb-8 sm:text-sm">

          <Link
            href="/"
            className="transition-colors hover:text-[#00C4B5]"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/products"
            className="transition-colors hover:text-[#00C4B5]"
          >
            Products
          </Link>

          <span>/</span>

          <span className="truncate text-[#2D3436]">
            {product.productName}
          </span>
        </div>

        {/* ================================================================
            MAIN PRODUCT GRID
        ================================================================ */}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

          {/* ==============================================================
              LEFT COLUMN - IMAGE GALLERY
          ============================================================== */}

          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:col-span-4">

            {/* Main Image */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-[2rem] bg-[#EAF8F9] p-4 sm:h-[380px] sm:p-6 md:h-[460px]"
            >

              <motion.img
                key={currentImage}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                src={currentImage}
                alt={product.productName}
                className="h-full w-full object-contain"
                onError={(event) => {
                  if (
                    event.currentTarget.src !==
                    PLACEHOLDER_IMAGE
                  ) {
                    event.currentTarget.src =
                      PLACEHOLDER_IMAGE;
                  }
                }}
              />

            </motion.div>

            {/* ============================================================
                THUMBNAILS
            ============================================================ */}

            {productImages.length > 0 && (
              <div className="scrollbar-hide flex gap-3 overflow-x-auto py-2">

                {productImages.map(
                  (image, index) => (
                    <button
                      key={
                        image.imageKey ||
                        image.url ||
                        index
                      }
                      type="button"
                      onClick={() =>
                        setActiveImage(index)
                      }
                      className={`flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl p-2 transition-all sm:h-20 sm:w-20 ${
                        activeImage === index
                          ? "scale-105 border border-[#00C4B5] bg-[#FFE66D]/30"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >

                      <img
                        src={image.url}
                        alt={`${product.productName} thumbnail ${
                          index + 1
                        }`}
                        className="h-full w-full object-contain"
                        onError={(event) => {
                          if (
                            event.currentTarget.src !==
                            PLACEHOLDER_IMAGE
                          ) {
                            event.currentTarget.src =
                              PLACEHOLDER_IMAGE;
                          }
                        }}
                      />

                    </button>
                  )
                )}

              </div>
            )}

          </div>

          {/* ==============================================================
              MIDDLE COLUMN - PRODUCT DETAILS
          ============================================================== */}

          <div className="flex flex-col py-2 lg:col-span-5">

            {/* ============================================================
                TITLE
            ============================================================ */}

            <div className="mb-6">

              {/* Category */}

              {product.category?.name && (
                <div className="mb-3">
                  <span className="inline-flex rounded-full bg-[#EAF8F9] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A99D]">
                    {product.category.name}
                  </span>
                </div>
              )}

              {/* Product Name */}

              <h1 className="mb-3 text-2xl font-black leading-tight tracking-tight text-[#2D3436] sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                {product.productName}
              </h1>

              {/* =========================================================
                  RATING
              ========================================================= */}

              <div className="mb-4 flex items-center gap-3 sm:mb-5">

                <div className="flex items-center text-[#FFB800]">

                  {[...Array(5)].map(
                    (_, index) => (
                      <Star
                        key={index}
                        className="h-4 w-4 fill-current sm:h-5 sm:w-5"
                      />
                    )
                  )}

                </div>

                <span className="text-xs font-bold text-gray-500 sm:text-sm">
                  Premium Product
                </span>

              </div>

              {/* =========================================================
                  PRICE / ENQUIRY
              ========================================================= */}

              <div className="mb-5 flex items-center sm:mb-6">

                <span className="text-2xl font-black text-[#00C4B5] sm:text-3xl">
                  Enquire for Price
                </span>

              </div>

              {/* =========================================================
                  SHORT DESCRIPTION
              ========================================================= */}

              {product.shortDescription && (
                <div
                  className="prose prose-sm jodit-content max-w-none  font-medium leading-relaxed text-gray-600 sm:prose-base md:text-lg"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.shortDescription,
                  }}
                />
              )}

            </div>

            {/* ============================================================
                QUICK FEATURES
            ============================================================ */}

            <div className="mb-6 border-t border-gray-100 py-6">

              <ul className="space-y-3">

                <li className="flex items-center gap-3 text-sm font-bold text-[#2D3436] md:text-base">

                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#A7F3D0] text-[#00C4B5] sm:h-6 sm:w-6">
                    <Check className="h-3 w-3 stroke-[3] sm:h-4 sm:w-4" />
                  </div>

                  Premium Quality Product

                </li>

                <li className="flex items-center gap-3 text-sm font-bold text-[#2D3436] md:text-base">

                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#A7F3D0] text-[#00C4B5] sm:h-6 sm:w-6">
                    <Check className="h-3 w-3 stroke-[3] sm:h-4 sm:w-4" />
                  </div>

                  Designed for Safe &amp; Active Play

                </li>

                <li className="flex items-center gap-3 text-sm font-bold text-[#2D3436] md:text-base">

                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#A7F3D0] text-[#00C4B5] sm:h-6 sm:w-6">
                    <Check className="h-3 w-3 stroke-[3] sm:h-4 sm:w-4" />
                  </div>

                  Quality-Focused Manufacturing

                </li>

              </ul>

            </div>

            {/* ============================================================
                CTA BUTTONS
            ============================================================ */}

            <div className="mb-8 flex flex-col">

              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

                {/* =====================================================
                    ENQUIRY POPUP BUTTON
                ===================================================== */}

                <button
                  type="button"
                  onClick={() =>
                    setIsPopupOpen(true)
                  }
                  className="
                    flex flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#FF6B6B]
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    uppercase
                    tracking-wider
                    text-white
                    shadow-md
                    transition-all
                    hover:-translate-y-0.5
                    hover:bg-[#ff5252]
                    sm:py-4
                    sm:text-base
                  "
                >
                  Enquiry Now

                  <ArrowRight
                    className="h-4 w-4 stroke-[3] sm:h-5 sm:w-5"
                  />
                </button>

                {/* =====================================================
                    WHATSAPP
                ===================================================== */}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:py-4 sm:text-base"
                >
                  <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />

                  <span>WhatsApp</span>
                </a>

              </div>

            </div>

            {/* ============================================================
                SPECIFICATIONS
            ============================================================ */}

            {product.specifications &&
              product.specifications.length > 0 && (
                <div className="overflow-hidden rounded-2xl bg-[#F4F9FF]">

                  {/* Header */}

                  <div className="flex items-center justify-between bg-[#E5F0FF] px-4 py-4 sm:px-6">

                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] sm:text-sm">
                      Key Specifications
                    </h3>

                    <span className="rounded-full bg-[#3B82F6] px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                      Official Specs
                    </span>

                  </div>

                  {/* Specs */}

                  <div className="divide-y divide-[#E2E8F0] text-xs sm:text-sm md:text-base">

                    {product.specifications.map(
                      (spec, index) => (
                        <div
                          key={`${spec.key}-${index}`}
                          className={`grid grid-cols-2 px-4 py-3.5 font-medium sm:px-6 sm:py-4 ${
                            index % 2 !== 0
                              ? "bg-white/50"
                              : ""
                          }`}
                        >

                          <span className="font-bold text-[#334155]">
                            {spec.key}
                          </span>

                          <span className="break-words text-[#0F172A]">
                            {spec.value}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>
              )}

          </div>

          {/* ==============================================================
              RIGHT COLUMN - TOYPARK SIDEBAR
          ============================================================== */}

          <div className="z-10 ml-auto w-full self-start lg:sticky lg:top-28 lg:col-span-3">

            <div className="relative flex flex-col gap-6 overflow-visible rounded-[2rem] bg-[#F8FAFC] p-5 shadow-md sm:p-6">

              {/* Mascot */}

              <img
                src="/assets/clouds/giraffe-svgrepo-com.svg"
                alt="Giraffe Mascot"
                className="pointer-events-none absolute -right-3 -top-5 z-10 h-12 w-12 rotate-6 sm:h-16 sm:w-16"
              />

              {/* Logo */}

              <div className="border-b border-gray-200/80 pb-4 sm:pb-5">

                <img
                  src="/assets/clean_logo_toypark.webp"
                  alt="ToyPark Logo"
                  className="mb-3 h-12 w-auto object-contain sm:h-14"
                />

                <h3 className="text-xl font-black uppercase leading-none tracking-tight text-[#FF5722] sm:text-2xl">
                  TOYPARK
                </h3>

                <p className="mt-1.5 text-xs font-bold text-gray-500 sm:text-sm">
                  Authentic &amp; Premium Quality Products
                </p>

              </div>

              {/* Why Choose */}

              <div>

                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A] sm:text-base">
                  Why Choose ToyPark
                </h4>

                <ul className="space-y-2.5 text-xs font-medium text-gray-600 sm:space-y-3 sm:text-sm">

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#FF5722]">
                      •
                    </span>

                    <span>
                      Quality-focused Indian manufacturing
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#FF5722]">
                      •
                    </span>

                    <span>
                      Reliable and consistent safety standards
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#FF5722]">
                      •
                    </span>

                    <span>
                      Built for modern play &amp; active learning
                    </span>
                  </li>

                </ul>

              </div>

              {/* About */}

              <div className="border-t border-gray-200/80 pt-4 sm:pt-5">

                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#0F172A] sm:text-base">
                  About ToyPark
                </h4>

                <ul className="space-y-2.5 text-xs font-medium text-gray-600 sm:space-y-3 sm:text-sm">

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#00C4B5]">
                      •
                    </span>

                    <span>
                      Premium product solutions &amp; designs
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#00C4B5]">
                      •
                    </span>

                    <span>
                      Trust, EN71 &amp; BIS certified safety
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="text-base text-[#00C4B5]">
                      •
                    </span>

                    <span>
                      Unwavering commitment to excellence
                    </span>
                  </li>

                </ul>

              </div>

              {/* WhatsApp */}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#20bd5a] sm:text-sm"
              >
                WhatsApp Us
              </a>

            </div>

          </div>

        </div>

        {/* ================================================================
            BOTTOM DETAILS
        ================================================================ */}

        <div className="mt-12 border-t border-gray-100 pt-8 lg:mt-16 lg:pt-10">

          {/* ==============================================================
              LONG DESCRIPTION
          ============================================================== */}

          {product.longDescription && (
            <div className="mb-12 rounded-[2rem] bg-[#F9FAFB] p-6 font-medium leading-relaxed text-gray-700 sm:p-8 md:p-12 lg:mb-16">

              <h3 className="mb-5 text-xl font-black text-[#2D3436] sm:text-2xl md:text-3xl">
                About {product.productName}
              </h3>

              <div
                className=" max-w-none text-gray-700  jodit-content "
                dangerouslySetInnerHTML={{
                  __html:
                    product.longDescription,
                }}
              />

            </div>
          )}

          {/* ==============================================================
              PRODUCT INFORMATION CARDS
          ============================================================== */}

          <div>

            <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">

              <span className="rounded-full bg-[#FFE66D] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2D3436] sm:text-xs">
                Product Information
              </span>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-[#2D3436] sm:text-3xl md:text-4xl">
                Designed for Quality &amp; Fun
              </h2>

            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Card 1 */}

              <div className="flex flex-col justify-between rounded-[2rem] bg-[#FDF6ED] p-6 lg:p-7">

                <div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF6B6B] text-xl text-white sm:mb-5 sm:h-14 sm:w-14 sm:text-2xl">
                    🎨
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#2D3436] sm:mb-3 sm:text-xl">
                    Creative Play
                  </h3>

                  <p className="text-xs font-medium leading-relaxed text-gray-600 sm:text-sm">
                    Designed to encourage creativity,
                    imagination, social interaction and
                    active learning through play.
                  </p>

                </div>

                <div className="mt-5 border-t border-gray-200/60 pt-4 text-[10px] font-bold uppercase tracking-wider text-[#FF6B6B] sm:mt-6 sm:text-xs">
                  • Sparks Creativity
                </div>

              </div>

              {/* Card 2 */}

              <div className="flex flex-col justify-between rounded-[2rem] bg-[#EAF8F9] p-6 lg:p-7">

                <div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4ECDC4] text-xl text-[#2D3436] sm:mb-5 sm:h-14 sm:w-14 sm:text-2xl">
                    🛡️
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#2D3436] sm:mb-3 sm:text-xl">
                    Safe &amp; Reliable
                  </h3>

                  <p className="text-xs font-medium leading-relaxed text-gray-600 sm:text-sm">
                    Created with quality-focused
                    materials and thoughtful designs
                    for everyday use.
                  </p>

                </div>

                <div className="mt-5 border-t border-gray-200/60 pt-4 text-[10px] font-bold uppercase tracking-wider text-[#00C4B5] sm:mt-6 sm:text-xs">
                  • Quality Focused
                </div>

              </div>

              {/* Card 3 */}

              <div className="flex flex-col justify-between rounded-[2rem] bg-[#F5EFFB] p-6 lg:p-7">

                <div>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9B59B6] text-xl text-white sm:mb-5 sm:h-14 sm:w-14 sm:text-2xl">
                    🚀
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-[#2D3436] sm:mb-3 sm:text-xl">
                    Premium Design
                  </h3>

                  <p className="text-xs font-medium leading-relaxed text-gray-600 sm:text-sm">
                    Thoughtfully designed products
                    combining functionality, quality and
                    modern aesthetics.
                  </p>

                </div>

                <div className="mt-5 border-t border-gray-200/60 pt-4 text-[10px] font-bold uppercase tracking-wider text-[#9B59B6] sm:mt-6 sm:text-xs">
                  • Premium Quality
                </div>

              </div>

            </div>

            {/* ============================================================
                CONTACT FORM
            ============================================================ */}

            <ContactForm
              productName={product.productName}
              className="mt-16 sm:mt-20"
            />

          </div>

        </div>

      </div>

      {/* ================================================================
          ENQUIRY POPUP
          SINGLE POPUP OUTSIDE MAIN CONTENT
      ================================================================ */}

      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        productName={product.productName}
      />

      <Footer2 />

    </div>
  );
}