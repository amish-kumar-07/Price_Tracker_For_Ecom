CREATE TABLE "notifications_setting" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"email" varchar(150) NOT NULL,
	"saved_price" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"title" varchar(225),
	"status" boolean DEFAULT false,
	"inital_time" timestamp with time zone
);
--> statement-breakpoint
DROP TABLE "notifications_log" CASCADE;--> statement-breakpoint
DROP TABLE "user_notifications" CASCADE;--> statement-breakpoint
ALTER TABLE "notifications_setting" ADD CONSTRAINT "notifications_setting_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications_setting" ADD CONSTRAINT "notifications_setting_product_id_products_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("product_id") ON DELETE cascade ON UPDATE no action;