import { validationResult } from "express-validator";

export const validationMiddleware = (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    const error = validationResult(req);

    if (!(error.isEmpty())) {
        return res.status(400).json({
            message : "Invalid Request",
            error : error.array()
        });
    };

    next();
};