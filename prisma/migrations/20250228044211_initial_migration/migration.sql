-- CreateTable
CREATE TABLE "sessions" (
    "id" BIGSERIAL NOT NULL,
    "id_user" BIGINT NOT NULL,
    "token" VARCHAR(100),
    "refresh_token" VARCHAR(100),
    "ip_address" VARCHAR(45),
    "user_agent" TEXT NOT NULL,
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
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),
    "banned" BOOLEAN NOT NULL DEFAULT false,
    "force_password_change" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form" (
    "id" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "module" TEXT,
    "icon" TEXT,
    "order" INTEGER,
    "route" TEXT,
    "parent_key" TEXT,
    "is_menu" BOOLEAN NOT NULL DEFAULT false,
    "is_crud" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_form" (
    "id" BIGSERIAL NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "form_key" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "create" BOOLEAN NOT NULL DEFAULT false,
    "delete" BOOLEAN NOT NULL DEFAULT false,
    "update" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "permission_form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exclusive_permission" (
    "id" BIGSERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "exclusive_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exclusive_permission_rol" (
    "id" BIGSERIAL NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "exclusive_permission_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(0),

    CONSTRAINT "exclusive_permission_rol_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "form_key_key" ON "form"("key");

-- CreateIndex
CREATE UNIQUE INDEX "exclusive_permission_key_key" ON "exclusive_permission"("key");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_form" ADD CONSTRAINT "permission_form_form_key_fkey" FOREIGN KEY ("form_key") REFERENCES "form"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_form" ADD CONSTRAINT "permission_form_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exclusive_permission_rol" ADD CONSTRAINT "exclusive_permission_rol_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exclusive_permission_rol" ADD CONSTRAINT "exclusive_permission_rol_exclusive_permission_key_fkey" FOREIGN KEY ("exclusive_permission_key") REFERENCES "exclusive_permission"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
