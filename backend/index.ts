import express from "express";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";
import linksRouter from "./routers/Links";


const app = express();
const port = 8000;
app.use(express.json());
app.use('/link',linksRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/links');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });
};

run().catch(err => console.log(err));