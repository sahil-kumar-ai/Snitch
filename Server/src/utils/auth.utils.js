import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

export const passwordHash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 12);

    return hashedPassword;
};

export const createAccessToken = (id, role) => {
    const accessToken = jwt.sign({
        id, role
    }, config.ACCESS_TOKEN_SECRET, { expiresIn : "15min" });

    return accessToken;
};

export const createRefreshToken = (id, role) => {
    const refreshToken = jwt.sign({
        id, role
    }, config.REFRESH_TOKEN_SECRET, { expiresIn : "7d" });

    return refreshToken;
};

export const isPasswordCorrect = async (password, hashPassword) => {
    const isPasswordCorrectOrNot = await bcrypt.compare(password, hashPassword);

    return !!isPasswordCorrectOrNot;
};

export const decodeRefreshToken = (refreshToken) => {
    const decoderefreshToken = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET);

    return decoderefreshToken;
};

export const decodeAccessToken = (accessToken) => {
    const decodeaccessToken = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET);

    return decodeaccessToken;
};