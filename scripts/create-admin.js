const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function main() {
  try {
    console.log("Connecting to database...");

    // Test database connection
    await prisma.$connect();
    console.log("Database connection successful");

    // Check if admin table exists
    try {
      console.log("Checking if admin table exists...");
      const tableExists = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_schema = 'public'
          AND table_name = 'admins'
        );
      `;
      console.log("Table check result:", tableExists);
    } catch (tableError) {
      console.error("Error checking table:", tableError);
    }

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ username: "admin" }, { email: "admin@homifan.com" }],
      },
    });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin);
      return;
    }

    // Hash the password
    console.log("Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);
    console.log("Password hashed successfully");

    // Create admin user
    console.log("Creating admin user...");
    const admin = await prisma.admin.create({
      data: {
        username: "admin",
        email: "admin@homifan.com",
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log("Admin user created successfully:", admin);
  } catch (error) {
    console.error("Error creating admin user:", error);
    console.error("Error details:", error.stack);

    if (error.code === "P2021") {
      console.log(
        'The "Admin" table does not exist. Please run the migration first.'
      );
    }
  } finally {
    console.log("Disconnecting from database...");
    await prisma.$disconnect();
    console.log("Database disconnected");
  }
}

main();
