CREATE TABLE "price_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"price_string" varchar(100),
	"recorded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "notifications_log" DROP CONSTRAINT "notifications_log_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications_log" DROP CONSTRAINT "notifications_log_product_id_products_product_id_fk";
--> statement-breakpoint
ALTER TABLE "notifications_log" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_log" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_log" ALTER COLUMN "type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_log" ALTER COLUMN "message" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "url" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price_string" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image" SET DATA TYPE varchar(1024);--> statement-breakpoint
ALTER TABLE "notifications_log" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD COLUMN "error_message" varchar(512);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "email" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "platform" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "platform_product_id" varchar(100);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "current_price" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "original_price" varchar(50);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "has_prime" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_best_seller" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_amazon_choice" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "is_fk_assured" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "notify_on_target_reached" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "email_enabled" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_products" ADD COLUMN "initial_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "user_products" ADD COLUMN "target_price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "user_products" ADD COLUMN "notes" varchar(512);--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD CONSTRAINT "notifications_log_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD CONSTRAINT "notifications_log_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_log" DROP COLUMN "log_id";--> statement-breakpoint
ALTER TABLE "notifications_log" DROP COLUMN "method";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "description";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "price";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "in_stock";--> statement-breakpoint
ALTER TABLE "user_notifications" DROP COLUMN "notify_on_restock";--> statement-breakpoint
ALTER TABLE "user_notifications" DROP COLUMN "notify_on_discount";--> statement-breakpoint
ALTER TABLE "user_notifications" DROP COLUMN "price_threshold";--> statement-breakpoint
ALTER TABLE "user_products" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_url_unique" UNIQUE("url");