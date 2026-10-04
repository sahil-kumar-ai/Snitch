import ProductModel from "../models/product.model.js";
import uploadFile from "../services/imageKit.service.js"

export const createProduct = async (req, res) => {
    const body = req.body;
    const file = req.files;

    const uploads = [];

    for (let i = 0; i < file.length; i++) {
        const response = await uploadFile(
            file[i].buffer,
            file[i].originalname
        );

        uploads.push(response.url);
    }

    const product = await ProductModel.create({
        title : body.title,
        description : body.description,
        price : {
            amount : body.price.amount,
            currency : body.price.currency,
        },
        images : uploads,
        sizes : body.sizes,
        seller : req.user.id
    });

    res.status(201).json({
        message : "Product created Successfully",
        product,
    });
};