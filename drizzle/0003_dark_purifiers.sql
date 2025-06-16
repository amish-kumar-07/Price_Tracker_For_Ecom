CREATE TABLE "user_products" (
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	CONSTRAINT "user_products_user_id_product_id_pk" PRIMARY KEY("user_id","product_id")
);
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "user_notifications" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_notifications" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD COLUMN "message" text;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD COLUMN "method" varchar(20) DEFAULT 'email';--> statement-breakpoint
ALTER TABLE "user_notifications" ADD COLUMN "price_threshold" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;