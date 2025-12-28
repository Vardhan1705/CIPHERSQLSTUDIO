const { Pool } = require('pg');
const mongoose = require('mongoose');

// PostgreSQL connection pool for sandbox
const pgPool = new Pool({
  host: process.env.PG_HOST || 'localhost',
  port: process.env.PG_PORT || 5432,
  database: process.env.PG_DATABASE || 'ciphersql_sandbox',
  user: process.env.PG_USER || 'admin',
  password: process.env.PG_PASSWORD || 'securepassword123',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://admin:securepassword123@localhost:27017/ciphersqlstudio?authSource=admin');
    console.log('✅ MongoDB connected successfully');
    
    // Test PostgreSQL connection
    const client = await pgPool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { connectDB, pgPool };