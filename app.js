import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { authorizeRequest } from './middlewares/auth.js';
import { calibrationRouter } from './routers/calibrateRouter.js';
import { immovableSpaceRouter } from './routers/immovableSpaceRouter.js';
import { baselineDataRouter } from './routers/baselineDataRouter.js';
import { sensorDataRouter } from './routers/sensorDataRouter.js';

const app = express();
const port =  parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(authorizeRequest);
app.use('/immovable-space', immovableSpaceRouter);
app.use('/baseline-data', baselineDataRouter);
app.use('/sensor-data', sensorDataRouter);
app.use('/calibrate', calibrationRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

async function connectToDBAndStartServer() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connection successful: " + process.env.DB_URL);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectToDBAndStartServer();
