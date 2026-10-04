export const parseProductData = (req, res, next) => {
    try {
        if (req.body.sizes) {
            req.body.sizes = JSON.parse(req.body.sizes);
        }

        if (req.body.price) {
            req.body.price = JSON.parse(req.body.price);
        }

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid JSON format"
        });
    }
};