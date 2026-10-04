import UserModel from "../models/user.model.js";
import { createUser, isEmailExist } from "../services/auth.service.js";
import { createAccessToken, createRefreshToken, decodeRefreshToken, isPasswordCorrect } from "../utils/auth.utils.js";

export const registerUserController = async (req, res) => {
    const {email, password, name} = req.body;

    const isUserExist = await isEmailExist(email);

    if (isUserExist) {
        res.status(400).json({
            message : "An user already exits with this email address",
            errors : [
                {
                    path : "email",
                    msg : "An user already exits with this email address",
                }
            ]
        });
    };

    const user = await createUser(email, name, password);

    const accessToken = createAccessToken(user._id, user.role);
    const refreshToken = createRefreshToken(user._id, user.role);

    await UserModel.findByIdAndUpdate(user._id, { refreshToken });

    res.cookie("refreshToken", refreshToken, { httpOnly : true });

    res.status(201).json({
        message : "User registered successfully",
        data : {
            user : {
                id : user._id,
                email : user.email,
                name : user.name,
            },
            accessToken,
        },
    });
};

export const loginUserController = async (req, res) => {
    const { email, password } = req.body;

    const isUserExist = await isEmailExist(email);

    if (!isUserExist) {
        return res.status(400).json({
            message : "Invalid Credentials",
            error : [
                {
                    path : "email",
                    msg : "Invalid email or password"
                }
            ]
        });
    };

    const user = await UserModel.findOne({ email });

    const isCorrectPassword = await isPasswordCorrect(password, user.hashPassword);

    if (!isCorrectPassword) {
        return res.status(400).json({
            message : "Invalid Credentials",
            error : [
                {
                    path : "password",
                    msg : "Invalid email or password"
                }
            ]
        });
    }

    const accessToken = createAccessToken(user._id, user.role);
    const refreshToken = createRefreshToken(user._id, user.role);

    await UserModel.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken
            });

    res.cookie("refreshToken", refreshToken, { httpOnly : true }); 

    res.status(201).json({
        message : "User LoggedIn successfully",
        data : {
            user : {
                id : user._id,
                email : user.email,
                name : user.name,
            },
            accessToken,
        },
    });
};

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({
            messgae : "Refresh token required"
        });
    };

    try {

        const { id, role } = decodeRefreshToken(refreshToken);

        const user = await UserModel.findById(id);

        if (user.refreshToken !== refreshToken) {
            await UserModel.findByIdAndUpdate(id, {
                refreshToken: null
            });

            return res.status(401).json({
                message : "Invalid refresh token"
            });
        };

        const newRefreshToken = createRefreshToken(user._id, user.role);
        const newAccessToken = createAccessToken(user._id, user.role);

        await UserModel.findByIdAndUpdate(id, { refreshToken : newRefreshToken });


        res.cookie("refreshToken", newRefreshToken, { httpOnly : true });

        res.status(201).json({
            message : "Token refreshed successfully",
            data : {
                user : {
                    email : user.email,
                    name : user.name,
                    id : user._id
                },
                newAccessToken,
            },
        });
        
    } catch (error) {
        return res.status(400).json({
            message : "Invalid or Expired refresh token"
        });
    };
};

export const findUser = async (req, res) => {
    const { id, role } = req.user;

    const user = await UserModel.findById(id);

    res.status(200).json({
        message : "User fetched successfully",
        data : {
            user : {
                email : user.email,
                name : user.name,
                id : user._id
            }
        }
    });
};