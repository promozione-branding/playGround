"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { motion, Variants } from "framer-motion";
import {
  Star,
  Heart,
  Sparkles,
  Cloud,
} from "lucide-react";

import PlayfulHeader from "../components/Navbar";
import Footer2 from "../components/Footer2";

/* =========================================================
   TYPES
========================================================= */

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface ProductImage {
  url: string;
  imageKey?: string;
}

interface ProductSpecification {
  key: string;
  value: string;
}

interface Product {
  _id: string;
  productName: string;
  slug: string;

  category: Category;

  images: ProductImage[];

  shortDescription?: string;
  longDescription?: string;

  specifications?: ProductSpecification[];

  metaTitle?: string;
  metaDescription?: string;

  createdAt?: string;
  updatedAt?: string;

  __v?: number;
}

interface ProductsResponse {
  success?: boolean;
  products?: Product[];
  Products?: Product[];
  data?: Product[];
}

interface CategoriesResponse {
  success?: boolean;
  categories?: Category[];
  Categories?: Category[];
  data?: Category[];
}

/* =========================================================
   FALLBACK IMAGE
========================================================= */

const PLACEHOLDER_IMAGE = "/assets/placeholder.png";

/* =========================================================
   GET PRODUCT IMAGE
========================================================= */

const getProductImage = (product: Product): string => {
  if (
    Array.isArray(product.images) &&
    product.images.length > 0 &&
    product.images[0]?.url
  ) {
    return product.images[0].url;
  }

  return PLACEHOLDER_IMAGE;
};

/* =========================================================
   GET PRODUCT CATEGORY
========================================================= */

const getProductCategory = (product: Product): string => {
  return product.category?.name || "Kids";
};

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   SKELETON CARD
========================================================= */

const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
      <div className="h-56 w-full animate-pulse bg-gray-200" />

      <div className="space-y-4 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />

        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-4 w-4 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>

        <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />

        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * Get category from:
   *
   * /products?cat=toys
   *
   * Returns:
   * toys
   */
  const categorySlugFromURL = searchParams.get("cat");

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  /*
   * activeCategorySlug:
   *
   * "all"
   * "toys"
   * "furniture"
   *
   * We use slug instead of category name.
   */
  const [activeCategorySlug, setActiveCategorySlug] =
    useState<string>("all");

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [loadingCategories, setLoadingCategories] =
    useState(true);

  const [productError, setProductError] =
    useState("");

  const [categoryError, setCategoryError] =
    useState("");

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductError("");

        const response = await axios.get<
          Product[] | ProductsResponse
        >("/api/product");

        const data = response.data;

        let productData: Product[] = [];

        if (Array.isArray(data)) {
          productData = data;
        } else if (data?.products) {
          productData = data.products;
        } else if (data?.Products) {
          productData = data.Products;
        } else if (data?.data) {
          productData = data.data;
        }

        setProducts(productData);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error
        );

        setProducts([]);

        setProductError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  /* =========================================================
     FETCH CATEGORIES
  ========================================================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoryError("");

        const response = await axios.get<
          Category[] | CategoriesResponse
        >("/api/category/");

        const data = response.data;

        let categoryData: Category[] = [];

        if (Array.isArray(data)) {
          categoryData = data;
        } else if (data?.categories) {
          categoryData = data.categories;
        } else if (data?.Categories) {
          categoryData = data.Categories;
        } else if (data?.data) {
          categoryData = data.data;
        }

        setCategories(categoryData);
      } catch (error) {
        console.error(
          "Error fetching categories:",
          error
        );

        setCategories([]);

        setCategoryError(
          "Unable to load categories."
        );
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  /* =========================================================
     HANDLE URL CATEGORY
  ========================================================= */

  useEffect(() => {
    /*
     * Wait until categories are loaded.
     */
    if (loadingCategories) {
      return;
    }

    /*
     * No ?cat=
     *
     * /products
     *
     * => All
     */
    if (!categorySlugFromURL) {
      setActiveCategorySlug("all");
      return;
    }

    /*
     * Find category using slug.
     */
    const matchedCategory = categories.find(
      (category) =>
        category.slug?.toLowerCase() ===
        categorySlugFromURL.toLowerCase()
    );

    /*
     * Valid category
     */
    if (matchedCategory) {
      setActiveCategorySlug(
        matchedCategory.slug
      );

      return;
    }

    /*
     * Invalid category
     *
     * /products?cat=wrong-category
     *
     * => All
     */
    setActiveCategorySlug("all");
  }, [
    categorySlugFromURL,
    categories,
    loadingCategories,
  ]);

  /* =========================================================
     CATEGORY TABS
  ========================================================= */

  const categoryTabs = useMemo(() => {
    const uniqueCategories = categories.filter(
      (category, index, self) =>
        index ===
        self.findIndex(
          (item) =>
            item.slug === category.slug ||
            item._id === category._id
        )
    );

    return uniqueCategories;
  }, [categories]);

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    /*
     * ALL PRODUCTS
     */
    if (activeCategorySlug === "all") {
      return products;
    }

    /*
     * CATEGORY PRODUCTS
     *
     * Match using category.slug
     */
    return products.filter((product) => {
      const productCategorySlug =
        product.category?.slug || "";

      return (
        productCategorySlug.toLowerCase() ===
        activeCategorySlug.toLowerCase()
      );
    });
  }, [
    products,
    activeCategorySlug,
  ]);

  /* =========================================================
     CATEGORY CLICK
  ========================================================= */

  const handleCategoryClick = (
    categorySlug: string
  ) => {
    /*
     * Update selected category immediately.
     */
    setActiveCategorySlug(categorySlug);

    /*
     * Update URL.
     *
     * category:
     * /products?cat=toys
     *
     * all:
     * /products
     */
    if (categorySlug === "all") {
      router.push("/products");
    } else {
      router.push(
        `/products?cat=${encodeURIComponent(
          categorySlug
        )}`
      );
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#EAF8F9] font-quicksand text-[#2D3436]">

      <PlayfulHeader />

      {/* =====================================================
          HERO / HEADER
      ===================================================== */}

      <section className="relative overflow-hidden px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pb-12 lg:pt-36">

        {/* Floating Cloud 1 */}

        <motion.div
          className="pointer-events-none absolute left-[5%] top-32 hidden text-white/70 sm:block"
          animate={{
            x: [0, 25, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-20 w-20 fill-white/30" />
        </motion.div>

        {/* Floating Cloud 2 */}

        <motion.div
          className="pointer-events-none absolute right-[8%] top-48 hidden text-white/60 sm:block"
          animate={{
            x: [0, -20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-24 w-24 fill-white/20" />
        </motion.div>

        {/* Sparkle 1 */}

        <motion.div
          className="pointer-events-none absolute left-[15%] top-60 text-[#F4B942]"
          animate={{
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-7 w-7" />
        </motion.div>

        {/* Sparkle 2 */}

        <motion.div
          className="pointer-events-none absolute right-[18%] top-72 text-[#F4B942]"
          animate={{
            rotate: [0, -15, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl text-center">

          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#18A6A6] shadow-sm"
          >
            <Sparkles className="h-4 w-4" />

            Explore Universes
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl"
          >
            Magical Toys &{" "}
            <span className="text-[#18A6A6]">
              Kids Furniture
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base"
          >
            Discover our curated collection of safe,
            ergonomic, and purely fun equipment for
            your little ones.
          </motion.p>

        </div>
      </section>

      {/* =====================================================
          CATEGORY TABS
      ===================================================== */}

      <section className="relative z-20 px-4 pb-8 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">

            {/* =================================================
                ALL
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                handleCategoryClick("all")
              }
              className={`shrink-0 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                activeCategorySlug === "all"
                  ? "bg-[#18A6A6] text-white shadow-lg shadow-[#18A6A6]/20"
                  : "bg-white text-gray-600 shadow-sm hover:bg-[#18A6A6] hover:text-white"
              }`}
            >
              All
            </button>

            {/* =================================================
                API CATEGORIES
            ================================================= */}

            {!loadingCategories &&
              categoryTabs.map((category) => {

                const isActive =
                  activeCategorySlug.toLowerCase() ===
                  category.slug.toLowerCase();

                return (
                  <button
                    type="button"
                    key={
                      category._id ||
                      category.slug
                    }
                    onClick={() =>
                      handleCategoryClick(
                        category.slug
                      )
                    }
                    className={`shrink-0 rounded-full px-6 py-3 text-sm font-bold capitalize transition-all duration-300 ${
                      isActive
                        ? "bg-[#18A6A6] text-white shadow-lg shadow-[#18A6A6]/20"
                        : "bg-white text-gray-600 shadow-sm hover:bg-[#18A6A6] hover:text-white"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}

            {/* =================================================
                CATEGORY LOADING
            ================================================= */}

            {loadingCategories &&
              Array.from({
                length: 4,
              }).map((_, index) => (
                <div
                  key={index}
                  className="h-11 w-28 shrink-0 animate-pulse rounded-full bg-white"
                />
              ))}

          </div>

          {/* Category Error */}

          {categoryError && (
            <p className="mt-3 text-center text-sm text-red-500">
              {categoryError}
            </p>
          )}

        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="relative px-4 pb-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          {/* =================================================
              PRODUCT ERROR
          ================================================= */}

          {productError && (
            <div className="mb-8 rounded-2xl bg-white p-6 text-center shadow-sm">

              <p className="text-red-500">
                {productError}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-4 rounded-xl bg-[#18A6A6] px-5 py-2 text-sm font-bold text-white"
              >
                Try Again
              </button>

            </div>
          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loadingProducts ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {Array.from({
                length: 8,
              }).map((_, index) => (
                <SkeletonCard
                  key={index}
                />
              ))}

            </div>

          ) : filteredProducts.length > 0 ? (

            /* =================================================
               PRODUCT GRID
            ================================================= */

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >

              {filteredProducts.map(
                (product) => {

                  const productImage =
                    getProductImage(
                      product
                    );

                  const categoryName =
                    getProductCategory(
                      product
                    );

                  return (
                    <motion.div
                      key={product._id}
                      variants={cardVariants}
                      whileHover={{
                        y: -8,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
                    >

                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <div className="relative h-56 overflow-hidden bg-gray-100">

                        <Link
                          href={`/products/${product.slug}`}
                          className="block h-full w-full"
                        >

                          <motion.img
                            whileHover={{
                              scale: 1.05,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                            src={
                              productImage
                            }
                            alt={
                              product.productName ||
                              "Product"
                            }
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(
                              event
                            ) => {

                              const target =
                                event.currentTarget;

                              if (
                                target.src.endsWith(
                                  PLACEHOLDER_IMAGE
                                )
                              ) {
                                return;
                              }

                              target.src =
                                PLACEHOLDER_IMAGE;
                            }}
                          />

                        </Link>

                        {/* Badge */}

                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#18A6A6] shadow-sm backdrop-blur">
                          New
                        </div>

                        {/* Heart */}

                        <button
                          type="button"
                          aria-label={`Add ${product.productName} to wishlist`}
                          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-500 shadow-sm backdrop-blur transition-all duration-300 hover:bg-[#18A6A6] hover:text-white"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                        >
                          <Heart className="h-5 w-5" />
                        </button>

                      </div>

                      {/* =================================================
                          CONTENT
                      ================================================= */}

                      <div className="p-5">

                        {/* Category */}

                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#18A6A6]">
                          {categoryName}
                        </p>

                        {/* Product Name */}

                        <Link
                          href={`/products/${product.slug}`}
                        >
                          <h2 className="line-clamp-2 min-h-[56px] text-lg font-black capitalize leading-7 text-[#2D3436] transition-colors duration-300 group-hover:text-[#18A6A6]">
                            {
                              product.productName
                            }
                          </h2>
                        </Link>

                        {/* Rating */}

                        <div className="mt-3 flex items-center gap-1">

                          {Array.from({
                            length: 5,
                          }).map(
                            (_, index) => (
                              <Star
                                key={
                                  index
                                }
                                className="h-4 w-4 fill-[#F4B942] text-[#F4B942]"
                              />
                            )
                          )}

                          <span className="ml-1 text-xs font-medium text-gray-400">
                            New Product
                          </span>

                        </div>

                        {/* Description */}

                        {product.shortDescription && (
                          <p
                            className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html:
                                product.shortDescription,
                            }}
                          />
                        )}

                        {/* Bottom */}

                        <div className="mt-5 flex items-center justify-between gap-3">

                          <span className="text-sm font-bold text-gray-500">
                            Enquire for Price
                          </span>

                        </div>

                        {/* Enquire Button */}

                        <a
                          href="tel:+919811117654"
                          className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#18A6A6] px-4 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#138989] hover:shadow-lg"
                        >
                          Enquire Now
                        </a>

                      </div>

                    </motion.div>
                  );
                }
              )}

            </motion.div>

          ) : (

            /* =================================================
               EMPTY STATE
            ================================================= */

            <div className="rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF8F9]">
                <Sparkles className="h-8 w-8 text-[#18A6A6]" />
              </div>

              <h2 className="mt-5 text-2xl font-black">
                No Products Found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find any products
                in this category. Please try
                another category.
              </p>

              <button
                type="button"
                onClick={() =>
                  handleCategoryClick("all")
                }
                className="mt-6 rounded-xl bg-[#18A6A6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#138989]"
              >
                View All Products
              </button>

            </div>

          )}

        </div>
      </section>

      {/* =====================================================
          FLOATING BACKGROUND ELEMENTS
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">

        <motion.div
          className="absolute -left-10 bottom-20 text-white/40"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-32 w-32 fill-white/20" />
        </motion.div>

        <motion.div
          className="absolute -right-10 bottom-40 text-white/40"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-36 w-36 fill-white/20" />
        </motion.div>

      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer2 />

    </main>
  );
}