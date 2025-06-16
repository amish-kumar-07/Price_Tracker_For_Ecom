ALTER TABLE "context" ALTER COLUMN "email" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "name" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "context" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;