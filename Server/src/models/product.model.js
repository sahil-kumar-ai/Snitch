import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        minLength : [3, "Minimum length of the title must be 3 charachter long"],
        maxLength : [100, "Maximum length of the title should be 100 charachter long"],
        required : true
    },
    description : {
        type : String,
        minLength : [20, "Minimum length of the title should be 20 charachter long"],
        maxLength : [500, "Maximum length of the title should be 500 charachter long"],
        required : true
    },
    images : {
        type : [
            {
                type : String,
            }
        ],
        validate : images => images.length <= 5
    },
    price : {
        amount : {
            type : Number,
            required : true
        },
        currency : {
            type : String,
            enum : ["INR", "USD"],
            default : "IND",
        },
    },
    sizes : [
        {
            size : {
                type : String,
                enum : ["XS", "S", "M", "L", "XL", "XXL"],
                required : true
            },
            stock : {
                type : Number,
                min : 0,
                default : 0
            },
        },
    ],
    seller : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    }
});

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;