let mongoose = require("mongoose")

let Schema = mongoose.Schema

let Product = new Schema({
    name     : String,
    image : String,
    gender : Number,
    status : String,
    form : String,
    line : String,
    cost : String,
    costRange : String,
    size : String,
    color : String,
    quantity : Number,
    introduce : String
}, {
    collection: "product"
});

let ProductModel = mongoose.model("product", Product);

//exports cho services dung
module.exports = ProductModel