/*
  Warnings:

  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- Convert emailVerified from boolean to timestamp with conditional logic
DO $$ BEGIN
    -- If emailVerified is currently boolean, convert it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'User' AND column_name = 'emailVerified'
          AND data_type = 'boolean'
    ) THEN
        -- First drop the default constraint
        ALTER TABLE "public"."User" ALTER COLUMN "emailVerified" DROP DEFAULT;
        -- Then drop NOT NULL if it exists
        ALTER TABLE "public"."User" ALTER COLUMN "emailVerified" DROP NOT NULL;
        -- Now convert the type: boolean true -> current timestamp, false -> NULL
        ALTER TABLE "public"."User" 
        ALTER COLUMN "emailVerified" TYPE TIMESTAMP(3) 
        USING CASE 
            WHEN "emailVerified" = true THEN CURRENT_TIMESTAMP 
            ELSE NULL 
        END;
    ELSIF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'User' AND column_name = 'emailVerified'
          AND data_type = 'timestamp without time zone'
    ) THEN
        -- Already timestamp, just ensure it's the right precision
        ALTER TABLE "public"."User" 
        ALTER COLUMN "emailVerified" TYPE TIMESTAMP(3);
    END IF;
END $$;

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
