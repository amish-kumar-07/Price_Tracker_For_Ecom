CREATE TABLE "notifications_log" (
	"log_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"product_id" integer,
	"type" varchar(50),
	"sent_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"url" varchar(400),
	"price" numeric(10, 2),
	"in_stock" boolean DEFAULT true,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_notifications" (
	"user_id" integer,
	"product_id" integer,
	"notify_on_price_drop" boolean DEFAULT true,
	"notify_on_restock" boolean DEFAULT true,
	"notify_on_discount" boolean DEFAULT true,
	CONSTRAINT "user_notifications_user_id_product_id_pk" PRIMARY KEY("user_id","product_id")
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
ALTER TABLE "notifications_log" ADD CONSTRAINT "notifications_log_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_log" ADD CONSTRAINT "notifications_log_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;