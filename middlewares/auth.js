// auth.js
import dotenv from 'dotenv';
dotenv.config();

export const authorizeRequest = (req, res, next) => {
    // Fetch the secret key from the environment variable
    const secretKey = process.env.SK;

    // Attempt to extract the bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Assuming "Bearer <token>" format

    if (!token) {
        return res.status(401).json({ error: 'Authorization failed: Bearer token is missing.' });
    }

    if (token !== secretKey) {
        return res.status(401).json({ error: 'Authorization failed: Invalid bearer token.' });
    }

    next();
};
