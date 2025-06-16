CREATE TABLE "context" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"name" varchar(100),
	"email" varchar(150) NOT NULL,
	"frequency" numeric(10, 2) NOT NULL,
	CONSTRAINT "context_email_unique" UNIQUE("email")
);
