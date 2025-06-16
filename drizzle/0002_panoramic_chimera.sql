ALTER TABLE "products" ADD COLUMN "url" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "price_string" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "image" varchar(500);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "stars" numeric(3, 2);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "total_reviews" integer;