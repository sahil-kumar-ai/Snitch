import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";

export const addToCartController = async (req, res) => {
    const { productId, quantity, size } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message : "Product not found"
        });
    };

    const selectedSize = product.sizes.find(s => s.size === size);

    if (!selectedSize) {
        return res.status(400).json({
            message : "Invalid size"
        });
    };

    if (selectedSize.stack < quantity) {
        return res.status(400).json({
            message : "Insufficient stock"
        });
    };

    const cart = (await CartModel.findOne({ user : req.user.id })) ??await CartModel.create({ user : req.user.id});

    const productInCart = cart.products.find(p => p.product.toString() == productId);

    if (productInCart) {
        if((productInCart.quantity + quantity) > selectedSize.stock) {
            return res.status(400).json({
                message : "Insufficient stock"
            });
        };
    };

    await CartModel.findOneAndUpdate(
        {user : req.user.id}, 
        {
            $push : {
                products : {
                    product: productId,
                    quantity : quantity,
                    size : size
                }
            }
        }
    );

    res.status(201).json({
        message : "Product added to cart successfully",
    });
};

export const getCart = async (req, res) => {
    const cart = (await CartModel.findOne({ user : req.user.id })) ?? (await CartModel.create({ user : req.user.id }));

    return res.status(200).json({
        message : "Cart retrived successfully",
        cart
    });
};