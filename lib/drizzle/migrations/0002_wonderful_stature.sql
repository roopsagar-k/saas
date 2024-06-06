CREATE TABLE IF NOT EXISTS "tests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"duration" integer DEFAULT 0,
	"description" text NOT NULL,
	"tags" text DEFAULT '' NOT NULL,
	"own_test" boolean DEFAULT false,
	"private_post" boolean DEFAULT false,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
DROP TABLE "account";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tests" ADD CONSTRAINT "tests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
