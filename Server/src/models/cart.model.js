import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products : [
        {
            product : {
                type : String,
                required : true,
                ref : "products"
            },
            size : {
                type : String,
                enum : ["XS", "S", "M", "L", "XL", "XXL"],
                required : true,
            },
            items : {
                type : Number,
                min : [1, "Minimum 1 item need to be added"],
                default : 1,
                required : true
            },
            user : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "user"
            }
        },
    ]
});

const CartModel = mongoose.model("cart", cartSchema);

export default CartModel;