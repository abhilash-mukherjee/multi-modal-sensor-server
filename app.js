import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { authorizeRequest } from './middlewares/auth.js';
import { calibrateRouter } from './routers/calibrateRouter.js';
import { immovableSpaceRouter } from './routers/immovableSpaceRouter.js';
import { baselineDataRouter } from './routers/baselineDataRouter.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(authorizeRequest);
app.use('/calibrate', calibrateRouter);
app.use('/immovable-space', immovableSpaceRouter);
app.use('/baseline-data', baselineDataRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function connectToDBAndStartServer() {
    try {
        await mongoose.connect('mongodb+srv://sayakhaldar5:sayak%40123@mongo-cluster-perishabl.qe7nys2.mongodb.net/sensor_multi_module?retryWrites=true&w=majority&appName=mongo-cluster-perishable');
        console.log("Connection successful");
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectToDBAndStartServer();
