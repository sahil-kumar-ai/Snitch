import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
    IMAGE_KIT_SECRET_KEY : process.env.IMAGE_KIT_SECRET_KEY,
};

export default config;