export const authorizeUser = (req, res, next) => {
    if ((req.user.role).trim() !== "admin") {
        return res.status(302).json({
            message : "You are not authorized to see this content"
        });
    };

    next();
}