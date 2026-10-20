CREATE TYPE "public"."status" AS ENUM('want-to-read', 'currently-reading', 'read', 'did-not-finish');--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "status" SET DEFAULT 'want-to-read'::"public"."status";--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "book_cover" text;