/*
  Warnings:

  - The primary key for the `Todop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Todop` table. All the data in the column will be lost.
  - The primary key for the `Userp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Userp` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todop" DROP CONSTRAINT "Todop_pkey",
DROP COLUMN "id",
ADD COLUMN     "tid" SERIAL NOT NULL,
ADD CONSTRAINT "Todop_pkey" PRIMARY KEY ("tid");

-- AlterTable
ALTER TABLE "Userp" DROP CONSTRAINT "Userp_pkey",
DROP COLUMN "id",
ADD COLUMN     "uid" SERIAL NOT NULL,
ADD CONSTRAINT "Userp_pkey" PRIMARY KEY ("uid");

-- AddForeignKey
ALTER TABLE "Todop" ADD CONSTRAINT "Todop_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Userp"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
