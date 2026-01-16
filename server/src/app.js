import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { config } from './config/index.js';
import authRoutes from './routes/auth.routes.js'


export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: config.clientUrl,
        credentials:true
    })
)

app.get('/api/health', (req, res)=>{
    return res.status(200).json({status:'ok'})
})

app.use('/api/auth', authRoutes)