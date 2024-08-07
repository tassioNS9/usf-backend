-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'DIRECTOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "TypeIndicators" AS ENUM ('BOOL', 'NUMERIC');

-- CreateTable
CREATE TABLE "units" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_unit" INTEGER,
    "office" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" SERIAL NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guidelines" (
    "id" SERIAL NOT NULL,
    "numeration" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "guidelines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectives" (
    "id" SERIAL NOT NULL,
    "numeration" INTEGER NOT NULL,
    "id_guideline" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indicators" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "id_objective" INTEGER NOT NULL,
    "type_Indicator" "TypeIndicators" NOT NULL,
    "sources" TEXT NOT NULL,

    CONSTRAINT "indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluations" (
    "id" SERIAL NOT NULL,
    "id_indicator" INTEGER NOT NULL,
    "id_unit" INTEGER NOT NULL,
    "evaluator" TEXT NOT NULL,
    "date_evaluation" DATE NOT NULL,
    "valueNum" INTEGER,
    "valueBol" BOOLEAN,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_name_key" ON "units"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "guidelines_numeration_key" ON "guidelines"("numeration");

-- CreateIndex
CREATE UNIQUE INDEX "guidelines_description_key" ON "guidelines"("description");

-- CreateIndex
CREATE UNIQUE INDEX "objectives_description_key" ON "objectives"("description");

-- CreateIndex
CREATE UNIQUE INDEX "indicators_description_key" ON "indicators"("description");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "objectives" ADD CONSTRAINT "objectives_id_guideline_fkey" FOREIGN KEY ("id_guideline") REFERENCES "guidelines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indicators" ADD CONSTRAINT "indicators_id_objective_fkey" FOREIGN KEY ("id_objective") REFERENCES "objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_id_indicator_fkey" FOREIGN KEY ("id_indicator") REFERENCES "indicators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_id_unit_fkey" FOREIGN KEY ("id_unit") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
