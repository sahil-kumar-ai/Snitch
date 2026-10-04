import mongoose from 'mongoose';
import config from './config.js';

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);

        console.log("DB Connected")
    } catch (error) {
        console.log("Error ->", error);
    }
};

export default connectToDB;