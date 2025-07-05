import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { connectDB } from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'zameeralimustafa@gmail.com' });
  if (existing) {
    console.log('⚠️ Admin user already exists');
    process.exit();
  }

  const hashedPassword = await bcrypt.hash('Zameer@1122@', 10);
  await User.create({
    name: 'Zameer Ali Mustafa',
    email: 'zameeralimustafa@gmail.com',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Admin user seeded!');
  process.exit();
};

seedAdmin().catch((err) => {
  console.error('❌ Error seeding admin:', err.message);
  process.exit(1);
});
