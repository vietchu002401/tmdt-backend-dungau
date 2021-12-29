
let OrderModel = require("../DatabaseModel/orderModel")
let ProductModel = require("../DatabaseModel/productModel")


let login = (req) => {
    let username = req.username
    let password = req.password
    if (username === "admin" && password === "123") {
        return "adminauthorization"
    } else {
        return ""
    }
}

let getAllOrder = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderModel.find()
                .then(data => {
                    resolve(data)
                })
        } catch (err) {
            reject(err)
        }
    })
}

let createOrder = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderModel.create({
                customerInfo: req.customerInfo,
                productInfo: req.productInfo,
                status: req.status,
                totalCost: req.totalCost
            }).then(data => {
                resolve(data._id)
            })
        } catch (err) {
            reject(err)
        }
    })
}

let searchOrder = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderModel.findOne({
                _id: req.id
            }).then(data => {
                resolve({
                    id: data._id,
                    productInfo: data.productInfo,
                    totalCost: data.totalCost,
                    status: data.status
                })
            }).catch(err => {
                resolve()
            })
        } catch (err) {
            reject(err)
        }
    })
}

let deleteOrder = async (req) => {
    return new Promise(async(resolve, reject) => {
        try {
            await req.product.forEach((item) => {
                ProductModel.findOne({ _id: item.id })
                    .then(data => {
                        let quantityLeft = data.quantity - item.buy
                        if(req.status){
                            quantityLeft = data.quantity - item.buy
                        }else{
                            quantityLeft = data.quantity
                        }
                        ProductModel.findOneAndUpdate(
                            { _id: item.id },
                            { quantity: quantityLeft },
                            { upsert: true, useFindAndModify: false }
                        ).then(data=> console.log(data))
                    })
            })
            await OrderModel.findByIdAndDelete(req.id)
                .then(data => {
                    resolve("deleted")
                }).catch(err => {
                    resolve(err)
                })
        } catch (err) {
            reject(err)
        }
    })
}

let changeStatus = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await OrderModel.findOneAndUpdate(
                {
                    _id: req.id
                },
                {
                    status: req.status
                },
                {
                    upsert: true,
                    useFindAndModify: false
                }
            )
                .then(data => {
                    resolve("updated")
                }).catch(err => {
                    resolve(err)
                })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    getAllOrder: getAllOrder,
    createOrder: createOrder,
    searchOrder: searchOrder,
    login: login,
    deleteOrder: deleteOrder,
    changeStatus: changeStatus
}