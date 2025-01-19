CREATE TABLE "cattles" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"breed" text NOT NULL,
	"gender" text NOT NULL,
	"weight" integer NOT NULL,
	"feeding_cycle" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crops" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"season" text NOT NULL,
	"quantity" integer NOT NULL,
	"cost_per_kg" integer NOT NULL,
	"selling_price" integer NOT NULL,
	"user_id" text NOT NULL
);
