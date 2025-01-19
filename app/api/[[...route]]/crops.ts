import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { crops, insertCropSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  // GET /crops - Fetch all crops for the authenticated user
  .get(
    "/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: "User not found" }, 401);
      }

      const data = await db
        .select({
          id: crops.id,
          name: crops.name,
          season: crops.season,
          quantity: crops.quantity,
          costPerKg: crops.costPerKg,
          sellingPrice: crops.sellingPrice,
        })
        .from(crops)
        .where(eq(crops.userId, auth.userId));

      return c.json({ data });
    }
  )
  // POST /crops - Create a new crop
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCropSchema.pick({
        name: true,
        season: true,
        quantity: true,
        costPerKg: true,
        sellingPrice: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      
      // console.log(auth?.userId);

      if (!auth?.userId) {
        return c.json({ error: "User not found" }, 401);
      }
  
      const [data] = await db
        .insert(crops)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();
  
      return c.json({ data });
    }
  )
  // DELETE /crops/:id - Delete a crop by ID
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!auth?.userId) {
        return c.json({ error: "User not found" }, 401);
      }

      if (!id) {
        return c.json({ error: "Invalid id" }, 400);
      }

      const [data] = await db
        .delete(crops)
        .where(
          and(eq(crops.id, id), eq(crops.userId, auth.userId))
        )
        .returning({ id: crops.id });

      if (!data) {
        return c.json({ error: "Crop not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
