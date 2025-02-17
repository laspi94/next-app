/*
  Warnings:

  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_id_user_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_id_rol_fkey";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "sessions" (
    "id" VARCHAR(255) NOT NULL,
    "id_user" BIGINT NOT NULL,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "last_activity" INTEGER NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "id_rol" INTEGER NOT NULL DEFAULT 3,
    "email_verified_at" TIMESTAMP(0),
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "force_password_change" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
