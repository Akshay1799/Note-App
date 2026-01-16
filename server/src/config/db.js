import mongoose from'mongoose';
import { config } from './index.js';

export const connectDB = async()=>{
    await mongoose.connect(config.mongoUri);
    console.log('Database connected successfully!');
}