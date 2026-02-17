import { pgTable, text, serial, integer, boolean, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Export chat models from the integration
export * from "./models/chat";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // e.g., "Diagnostic", "Surgical", "Laser"
  price: numeric("price").notNull(), // Using numeric for currency
  description: text("description").notNull(),
  specifications: jsonb("specifications").$type<Record<string, string>>().notNull(), // Key-value pairs
  imageUrl: text("image_url").notNull(),
  isBestSeller: boolean("is_best_seller").default(false).notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  productIds: integer("product_ids").array().notNull(), // Array of product IDs interested in
  status: text("status").default("pending").notNull(), // pending, contacted, closed
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, status: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
