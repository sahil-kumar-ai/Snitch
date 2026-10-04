import { decodeAccessToken } from '../utils/auth.utils.js';

export const validateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).json({
            message : "Invalid token"
        });
    };

    try {
        const decodedToken = decodeAccessToken(token);

        req.user = decodedToken;

        next();
        
    } catch (error) {
        return res.status(400).json({
            message : "Invalid User"
        });
    };
};