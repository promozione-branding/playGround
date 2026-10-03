import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";


export const metadata: Metadata = {
  title: "Group Learning Plastic Table | Play School Furniture | Toy Park",

  description:
    "Explore Group Learning Plastic Tables from Toy Park, a trusted Play School Furniture manufacturer and wholesaler offering durable, child-friendly tables for schools and learning spaces.",

 
};

export default function ProductsPage() {
  return <ProductsClient />;
}