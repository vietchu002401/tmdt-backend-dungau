let mongoose = require("mongoose")

let Schema = mongoose.Schema

let Order = new Schema({
    customerInfo : Object,
    productInfo : Object,
    status : Boolean,
    totalCost : Number
}, {
    collection: "orders"
});

let OrderModel = mongoose.model("orders", Order);

//exports cho services dung
module.exports = OrderModel