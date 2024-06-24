import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import { log } from "node:util";

dotenv.config();

const app: express.Express = express();

app.use(cors({ credentials: true, }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

server.listen(PORT, (): void => {
    console.log('Server running on port 3000');
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONODB_CONNECTION_URL!).then(() => console.log("Connected to MongoDB"));

mongoose.connection.on('error', (error: Error) => {
    console.error(error);
    process.exit(1);
});
