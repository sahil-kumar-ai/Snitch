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

export const listAllProductController = async (req, res) => {
    const product = await ProductModel.findOne({ publishes : true });

    res.status(200).json({
        message : "All product fetched successfully",
        data : [
            product
        ]
    });
};

export const listAllProductToSellerController = async (req, res) => {
    const product = await ProductModel.findOne();

    res.status(200).json({
        message : "All product fetched successfully for seller",
        data : [
            product
        ]
    });
};

export const unlistProduct = async (req, res) => {
    const { id } = req.params;

    const product = ProductModel.findById(id);

    if (!product) {
        return res.status(400).json({
            message : "Product not found"
        });
    };

    await ProductModel.findByIdAndUpdate(id, 
        { published : false }
    );

    res.status(200).json({
        message : "Product unpublished successfully"
    });
};

export const listProduct = async (req, res) => {
    const { id } = req.params;

    const product = ProductModel.findById(id);

    if (!product) {
        return res.status(400).json({
            message : "Product not found"
        });
    };

    await ProductModel.findByIdAndUpdate(id, 
        { published : true }
    );

    res.status(200).json({
        message : "Product unpublished successfully"
    });
};