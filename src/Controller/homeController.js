let productServices = require("../Services/productServices")
let orderServices = require("../Services/orderServices")

let getHome=(req,res)=>{
    return res.send("backend ananas clone")
}

let createProduct = async(req,res)=>{
    let message = await productServices.createProduct(req.body)
    return res.send(message)
}
let getAllProduct = async(req,res)=>{
    let message = await productServices.getAllProduct(req.body)
    return res.send(message)
}
let findProduct=async(req,res)=>{
    let message = await productServices.findProduct(req.body)
    return res.send(message)
}

let getDetail = async(req, res)=>{
    let message = await productServices.getDetail(req.body)
    return res.send(message)
}

let getToBuy=async(req, res)=>{
    let message = await productServices.findToBuy(req.body)
    return res.send(message)
}

let getAllOrder=async(req,res)=>{
    let message = await orderServices.getAllOrder()
    return res.send(message)
}
let createOrder=async(req,res)=>{
    let message = await orderServices.createOrder(req.body)
    return res.send(message)
}

let searchOrder=async(req,res)=>{
    let message = await orderServices.searchOrder(req.body)
    return res.send(message)
}

let login = (req,res)=>{
    let message = orderServices.login(req.body)
    return res.send(message)
}
let deleteOrder=async(req,res)=>{
    let message = await orderServices.deleteOrder(req.body)
    return res.send(message)
}

let changeStatus = async(req,res)=>{
    let message = await orderServices.changeStatus(req.body)
    return res.send(message)
}

let searchProduct = async(req,res)=>{
    let message = await productServices.searchProduct(req.body)
    return res.send(message)
}


module.exports = {
    getHome : getHome,
    createProduct : createProduct,
    getAllProduct : getAllProduct,
    findProduct : findProduct,
    getDetail : getDetail,
    getToBuy : getToBuy,
    getAllOrder : getAllOrder,
    createOrder : createOrder,
    searchOrder : searchOrder,
    login  : login,
    deleteOrder : deleteOrder,
    changeStatus : changeStatus,
    searchProduct : searchProduct
}