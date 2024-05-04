-- CreateTable
CREATE TABLE "boycott_products" (
    "id" UUID NOT NULL,
    "boycott_name" VARCHAR(255) NOT NULL,
    "boycott_image" VARCHAR(255) NOT NULL,
    "alternate_name" VARCHAR(255) NOT NULL,
    "alternate_image" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "boycott_products_pkey" PRIMARY KEY ("id")
);
