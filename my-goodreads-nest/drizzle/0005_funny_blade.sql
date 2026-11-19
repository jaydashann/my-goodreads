CREATE TYPE "public"."sysmodule_enum" AS ENUM('USER_MANAGEMENT', 'BOOK_MANAGEMENT');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'guest');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'admin';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "modules" "sysmodule_enum"[] DEFAULT '{}' NOT NULL;