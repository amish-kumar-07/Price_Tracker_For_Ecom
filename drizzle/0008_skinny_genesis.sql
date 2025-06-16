ALTER TABLE "notifications_setting" ALTER COLUMN "saved_price" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_setting" ADD COLUMN "tracking_frequency" integer DEFAULT 180 NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications_setting" ADD COLUMN "initial_time" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "original_price" numeric(10, 2);--> statement-breakpoint
CREATE INDEX "notifications_unique_alert_idx" ON "notifications_setting" USING btree ("user_id","product_id","type");--> statement-breakpoint
CREATE INDEX "price_history_product_id_idx" ON "price_history" USING btree ("product_id");--> statement-breakpoint
CREATE INDEX "products_platform_product_id_idx" ON "products" USING btree ("platform_product_id");--> statement-breakpoint
ALTER TABLE "notifications_setting" DROP COLUMN "inital_time";