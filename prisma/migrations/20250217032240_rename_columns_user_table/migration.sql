/*
  Warnings:

  - You are about to drop the column `bloqueado` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `forzar_cambio_clave` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "bloqueado",
DROP COLUMN "forzar_cambio_clave",
ADD COLUMN     "banned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "force_password_change" BOOLEAN NOT NULL DEFAULT true;
