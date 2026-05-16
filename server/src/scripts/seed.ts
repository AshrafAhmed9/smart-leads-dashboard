import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import { User } from '../models/user.model';
import { Lead } from '../models/lead.model';

const seed = async () => {
  await connectDB();

  await User.deleteMany({});
  await Lead.deleteMany({});

  const adminPass = await bcrypt.hash('Admin1234!', 12);
  const salesPass = await bcrypt.hash('Sales1234!', 12);

  const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const sales = await User.create({ name: 'Sales Rep', email: 'sales@example.com', password: salesPass, role: 'sales' });

  const statuses = ['New', 'Contacted', 'Qualified', 'Lost'] as const;
  const sources  = ['Website', 'Instagram', 'Referral'] as const;

  const leadsData = [
    { name: 'Rahul Sharma',    email: 'rahul@techcorp.com' },
    { name: 'Priya Mehta',     email: 'priya@designstudio.in' },
    { name: 'Arjun Patel',     email: 'arjun@startup.io' },
    { name: 'Sneha Gupta',     email: 'sneha@marketingco.com' },
    { name: 'Vikram Singh',    email: 'vikram@fintech.in' },
    { name: 'Ananya Rao',      email: 'ananya@ecommerce.com' },
    { name: 'Karthik Nair',    email: 'karthik@agency.co' },
    { name: 'Divya Krishnan',  email: 'divya@media.in' },
    { name: 'Rohan Joshi',     email: 'rohan@saas.io' },
    { name: 'Pooja Agarwal',   email: 'pooja@consulting.com' },
    { name: 'Amit Verma',      email: 'amit@logistics.in' },
    { name: 'Neha Bose',       email: 'neha@retail.com' },
    { name: 'Sanjay Kumar',    email: 'sanjay@realestate.in' },
    { name: 'Kavya Reddy',     email: 'kavya@healthtech.io' },
    { name: 'Rajan Iyer',      email: 'rajan@edtech.com' },
    { name: 'Meera Shah',      email: 'meera@foodtech.in' },
    { name: 'Deepak Yadav',    email: 'deepak@mobility.io' },
    { name: 'Lakshmi Pillai',  email: 'lakshmi@events.com' },
    { name: 'Tarun Chopra',    email: 'tarun@analytics.in' },
    { name: 'Shruti Malhotra', email: 'shruti@legal.com' },
  ];

  await Lead.insertMany(leadsData.map((l, i) => ({
    ...l,
    status:    statuses[i % statuses.length],
    source:    sources[i % sources.length],
    createdBy: i % 3 === 0 ? admin._id : sales._id,
  })));

  console.log('Seeded: 2 users + 20 leads');
  console.log('admin@example.com / Admin1234!');
  console.log('sales@example.com / Sales1234!');
  process.exit(0);
};

seed().catch(console.error);
