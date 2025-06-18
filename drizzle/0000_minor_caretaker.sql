CREATE TABLE "context" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"frequency" integer DEFAULT 3 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"asin" varchar(255) NOT NULL,
	"frequency" integer DEFAULT 3 NOT NULL,
	"last_updated" timestamp DEFAULT now(),
	"status" boolean DEFAULT true,
	"current_price" numeric(10, 2) NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "price_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"price_string" varchar(100),
	"recorded_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256),
	"name" varchar(256) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"image" varchar(1024),
	"asin" varchar(256) NOT NULL,
	"platform" varchar(50) NOT NULL,
	"platform_product_id" varchar(100),
	"current_price" numeric(10, 2) NOT NULL,
	"original_price" numeric(10, 2),
	"price_string" varchar(100),
	"stars" numeric(3, 2),
	"total_reviews" integer,
	"has_prime" boolean DEFAULT false,
	"is_best_seller" boolean DEFAULT false,
	"is_amazon_choice" boolean DEFAULT false,
	"is_fk_assured" boolean DEFAULT false,
	"last_updated" timestamp DEFAULT now(),
	CONSTRAINT "products_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE "user_products" (
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"initial_price" numeric(10, 2),
	"target_price" numeric(10, 2),
	"notes" varchar(512),
	"added_at" timestamp DEFAULT now(),
	CONSTRAINT "user_products_user_id_product_id_pk" PRIMARY KEY("user_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100),
	"email" varchar(150) NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "notification_settings" ADD CONSTRAINT "notification_settings_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "price_history" ADD CONSTRAINT "price_history_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_products" ADD CONSTRAINT "user_products_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notification_user_asin_idx" ON "notification_settings" USING btree ("email","asin");--> statement-breakpoint
CREATE INDEX "price_history_product_id_idx" ON "price_history" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "products_platform_product_id_idx" ON "products" USING btree ("platform_product_id");