import type { Metadata } from "next";
import SingleProduct from "./SingleProduct";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/* =========================================================
   TYPES
========================================================= */

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

export interface Product {
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

/* =========================================================
   CLEAN HTML
========================================================= */

function cleanDescription(value = ""): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   FETCH SINGLE PRODUCT
========================================================= */

async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/product/${encodeURIComponent(slug)}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Product API Error:",
        response.status,
        response.statusText
      );

      return null;
    }

    const data: ProductResponse | Product =
      await response.json();

    /* API returns product directly */

    if (
      data &&
      typeof data === "object" &&
      "productName" in data
    ) {
      return data as Product;
    }

    /* API returns { product: {...} } */

    if (
      data &&
      typeof data === "object" &&
      "product" in data &&
      data.product
    ) {
      return data.product;
    }

    /* API returns { Product: {...} } */

    if (
      data &&
      typeof data === "object" &&
      "Product" in data &&
      data.Product
    ) {
      return data.Product;
    }

    /* API returns { data: {...} } */

    if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      data.data &&
      typeof data.data === "object"
    ) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error(
      "Error fetching product:",
      error
    );

    return null;
  }
}

/* =========================================================
   GENERATE SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    productName: string;
  }>;
}): Promise<Metadata> {
  const { productName } = await params;

  const product = await getProduct(productName);

  /* Product not found */

  if (!product) {
    return {
      title: "Product Not Found | ToyPark",

      description:
        "The requested product could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  /* Meta title from API */

  const metaTitle =
    product.metaTitle?.trim() ||
    product.productName?.trim() ||
    "Product | ToyPark";

  /* Meta description from API */

  const metaDescription =
    product.metaDescription?.trim() ||
    cleanDescription(product.shortDescription) ||
    `Explore ${product.productName} from ToyPark.`;

  /* Product image */

  const productImage =
    product.images?.[0]?.url || undefined;

  /* Canonical URL */

  const productSlug =
    product.slug || productName;


  return {
    title: metaTitle,

    description: metaDescription,

   
   

   
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function Page({
  params,
}: {
  params: Promise<{
    productName: string;
  }>;
}) {
  const { productName } = await params;

  const product = await getProduct(productName);

  return (
    <SingleProduct
      product={product}
      slug={productName}
    />
  );
}