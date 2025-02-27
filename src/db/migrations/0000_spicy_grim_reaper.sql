CREATE TABLE "submissions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"createdAt" date NOT NULL,
	"ipAddress" text NOT NULL,
	"userAgent" text NOT NULL
);
