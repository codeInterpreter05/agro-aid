import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { cattle, insertCattleSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  // GET all cattle for the authenticated user
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
          id: cattle.id,
          name: cattle.name,
          breed: cattle.breed,
          gender: cattle.gender,
          weight: cattle.weight,
          feedingCycle: cattle.feedingCycle,
        })
        .from(cattle)
        .where(eq(cattle.userId, auth.userId));

      return c.json({ data });
    }
  )
  // POST to create a new cattle record
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertCattleSchema.pick({
        name: true,
        breed: true,
        gender: true,
        weight: true,
        feedingCycle: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "User not found" }, 401);
      }

      const [data] = await db
        .insert(cattle)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values, // Includes all required fields
        })
        .returning();

      return c.json({ data });
    }
  )
  // DELETE a cattle record by ID
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
        return c.json({ error: "Invalid ID" }, 400);
      }

      const [data] = await db
        .delete(cattle)
        .where(
          and(eq(cattle.id, id), eq(cattle.userId, auth.userId))
        )
        .returning({
          id: cattle.id,
        });

      if (!data) {
        return c.json({ error: "Cattle record not found" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;

