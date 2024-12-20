CREATE TYPE "public"."application-status" AS ENUM('APPLIED', 'GOT_TASK', 'GO_INTERVIEW_CALL', 'HIRED', 'REJECTED');--> statement-breakpoint
CREATE TYPE "public"."job-type" AS ENUM('INTERNSHIP_ONSITE', 'INTERNSHIP_REMOTE', 'INTERNSHIP_HYBRID', 'FULL_TIME_ONSITE', 'FULL_TIME_REMOTE', 'FULL_TIME_HYBRID', 'PART_TIME_ONSITE', 'PART_TIME_REMOTE', 'PART_TIME_HYBRID');--> statement-breakpoint
CREATE TYPE "public"."connection-status" AS ENUM('INVITED', 'CONNECTED', 'IN_CONTACT');--> statement-breakpoint
CREATE TYPE "public"."interview-status" AS ENUM('PENDING', 'SUBMITTED', 'IGNORED');--> statement-breakpoint
CREATE TYPE "public"."task-status" AS ENUM('PENDING', 'SUBMITTED', 'IGNORED');--> statement-breakpoint
CREATE TYPE "public"."provider" AS ENUM('GOOGLE', 'CREDENTIALS');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"companyId" uuid NOT NULL,
	"designation" varchar(40),
	"jobPostLink" text,
	"description" text,
	"type" "job-type",
	"status" "application-status" DEFAULT 'APPLIED',
	"salary" real,
	"expectedSalary" real,
	"skills" text[],
	"location" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"name" varchar(80) NOT NULL,
	"email" varchar(60),
	"website" text,
	"carrierPage" text,
	"linkedIn" text,
	"location" varchar(80),
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "connections" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"companyId" uuid NOT NULL,
	"name" varchar(60),
	"designation" varchar(60),
	"linkedIn" text,
	"phone" varchar(16),
	"email" varchar(60),
	"status" "connection-status" DEFAULT 'INVITED',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "interviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"applicationId" uuid NOT NULL,
	"level" integer NOT NULL,
	"description" text,
	"note" text,
	"status" "interview-status" DEFAULT 'PENDING',
	"interviewDate" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"applicationId" uuid NOT NULL,
	"level" integer NOT NULL,
	"description" text,
	"note" text,
	"status" "task-status" DEFAULT 'PENDING',
	"deadline" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(60) NOT NULL,
	"email" varchar(60) NOT NULL,
	"password" varchar(60),
	"imageUrl" text,
	"provider" "provider",
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "applications" ADD CONSTRAINT "applications_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connections" ADD CONSTRAINT "connections_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "interviews" ADD CONSTRAINT "interviews_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_applicationId_applications_id_fk" FOREIGN KEY ("applicationId") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
