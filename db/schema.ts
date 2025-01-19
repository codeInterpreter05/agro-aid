import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Crop schema
export const crops = pgTable("crops", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    season: text("season").notNull(),
    quantity: integer("quantity").notNull(), // Quantity in kg
    costPerKg: integer("cost_per_kg").notNull(),
    sellingPrice: integer("selling_price").notNull(),
    userId: text("user_id").notNull(),
});

export const insertCropSchema = createInsertSchema(crops);

// Cattle schema
export const cattle = pgTable("cattles", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    breed: text("breed").notNull(),
    gender: text("gender").notNull(),
    weight: integer("weight").notNull(), // Weight in kg
    feedingCycle: text("feeding_cycle").notNull(),
    userId: text("user_id").notNull(),
});

export const insertCattleSchema = createInsertSchema(cattle);