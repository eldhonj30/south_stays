import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from './Routes/userRoutes.js'
import hostRoutes from './Routes/hostRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
import connectDB from "./Config/dbConfig.js";
import { notFound, errorHandler } from "./Middlewares/errorMiddleware.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();


connectDB();

const port = process.env.PORT || 5000;
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
); 
app.use('/Uploads', express.static(__dirname+'/Uploads'))

app.use("/guest", userRoutes); 
app.use("/host", hostRoutes);
app.use("/admin",adminRoutes);
app.use("/message",messageRoutes)


app.use(notFound);
app.use(errorHandler);  



app.get('/test',(req,res) => {
  res.json('test ok')
})


app.listen(port, () => console.log(`server started on port ${port}`));