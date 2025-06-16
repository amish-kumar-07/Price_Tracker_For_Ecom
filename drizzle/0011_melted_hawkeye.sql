ALTER TABLE "context" DROP CONSTRAINT "context_email_unique";--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "name" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "frequency" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "frequency" SET DEFAULT 3;--> statement-breakpoint
ALTER TABLE "context" ALTER COLUMN "frequency" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "context" DROP COLUMN "id";