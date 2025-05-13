-- Create Admin table
CREATE TABLE IF NOT EXISTS "admins" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- Create unique indexes
CREATE UNIQUE INDEX IF NOT EXISTS "admins_username_key" ON "admins"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "admins_email_key" ON "admins"("email");

-- Insert a default admin user (password will need to be hashed)
-- Note: Replace this with a properly hashed password in production
INSERT INTO "admins" ("id", "username", "email", "password", "role", "created_at", "updated_at")
VALUES (
    gen_random_uuid(), 
    'admin', 
    'admin@homifan.com', 
    '$2a$10$JdJF1JFvPYMfQOKil.8Vre9nVzPK9y5eMz/i2q0F3/POkPBB8CjGi', -- This is 'admin123' hashed
    'admin',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);
