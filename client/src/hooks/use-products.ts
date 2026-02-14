import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/schema"; // Actually imports form shared/schema but api is in routes, correcting based on prompt instructions to use route manifest
import { api as apiRoutes, buildUrl } from "@shared/routes";

// Correct type imports based on schema
import type { Product, Inquiry } from "@shared/schema";

export function useProducts() {
  return useQuery({
    queryKey: [apiRoutes.products.list.path],
    queryFn: async () => {
      const res = await fetch(apiRoutes.products.list.path);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json() as Product[];
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [apiRoutes.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(apiRoutes.products.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch product");
      return await res.json() as Product;
    },
    enabled: !!id,
  });
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch(apiRoutes.inquiries.submit.path, {
        method: apiRoutes.inquiries.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit inquiry");
      }
      return await res.json() as Inquiry;
    },
  });
}
