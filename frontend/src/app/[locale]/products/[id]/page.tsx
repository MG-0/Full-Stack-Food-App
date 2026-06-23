import React from "react";
import ProductDetailsUi from "@/components/product/ProductDetailsUi";

interface PageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProductDetailsUi id={resolvedParams.id} />;
}
