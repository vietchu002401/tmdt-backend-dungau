let ProductModel = require("../DatabaseModel/productModel")

let createProduct = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.findOne({
                name: req.name,
                color: req.color,
                size: req.size,
                gender: req.gender
            }).then(data => {
                if (data) {
                    resolve("san pham da ton tai")
                } else {
                    ProductModel.create({
                        name: req.name,
                        image: req.image,
                        gender: req.gender,
                        status: req.status,
                        form: req.form,
                        line: req.line,
                        cost: req.cost,
                        size: req.size,
                        color: req.color,
                        quantity: req.quantity,
                        costRange : req.costRange,
                        introduce : req.introduce
                    }).then(data => {
                        resolve({
                            message: "tao san pham thanh cong",
                            name: data.name,
                            image: data.image,
                            gender: data.gender,
                            status: data.status,
                            form: data.form,
                            line: data.line,
                            cost: data.cost,
                            size: data.size,
                            color: data.color,
                            quantity: data.quantity,
                            costRange : req.costRange,
                            introduce : req.introduce
                        })
                    })
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

let getAllProduct = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.find()
                .then(data => {
                    let arr = data.map(item => {
                        return {
                            id: item.id,
                            image: item.image,
                            name: item.name,
                            color: item.color,
                            gender: item.gender,
                            form: item.form,
                            size : item.size,
                            cost: item.cost,
                            quantity : item.quantity
                        }
                    })

                    let newArr = req.sliceRange > data.length ? arr : arr.slice(0,req.sliceRange)
                    resolve(newArr)
                })
        } catch (err) {
            reject(err)
        }
    })
}

let findProduct = async (req) => {
    if (req.status === "") {
        delete req.status
    } if (req.form === "") {
        delete req.form
    } if (req.line === "") {
        delete req.line
    } if (req.costRange === "") {
        delete req.costRange
    } if (req.size === "") {
        delete req.size
    } if (req.color === "") {
        delete req.color
    }

    let sliceRange = req.sliceRange

    delete req.sliceRange
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.find(req).then(data => {
                let arr = data.map(item => {
                    return {
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        line: item.line,
                        color: item.color,
                        form: item.form,
                        cost: item.cost,
                        quantity : item.quantity
                    }
                })
                let newArr = req.sliceRange > data.length ? arr : arr.slice(0,sliceRange)
                resolve(newArr)
            })
        } catch (err) {
            reject(err)
        }
    })
}

let getDetail = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.findOne({
                _id: req.id
            }).then(data => {
                resolve({
                    id: data.id,
                    gender: data.gender,
                    name: data.name,
                    image: data.image,
                    form: data.form,
                    color: data.color,
                    cost: data.cost,
                    quantity: data.quantity,
                    introduce : data.introduce
                })
            })
            // await ProductModel.updateMany({},{
            //     introduce : ""
            // }, {multi: true})
        } catch (err) {
            reject(err)
        }
    })
}

let findToBuy = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            await ProductModel.findOne(req).then(data => {
                if (data) {
                    resolve({
                        id: data.id,
                        gender: data.gender,
                        name: data.name,
                        image: data.image,
                        form: data.form,
                        color: data.color,
                        size : data.size,
                        cost: data.cost,
                        quantity: data.quantity
                    })
                } else {
                    resolve({
                        message: "Khong co san pham",
                        quantity: 0
                    })
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

let searchProduct = async(req)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            await ProductModel.find()
            .then(data=>{
                let arr = data.filter(item=>{
                    if(item.name.toLowerCase().includes(req.key) || item.form.toLowerCase().includes(req.key) || item.line.toLowerCase().includes(req.key) || item.color.toLowerCase().includes(req.key) || item.cost.toLowerCase().includes(req.key) || item.status.toLowerCase().includes(req.key)){
                        return item
                    }
                })
                resolve(arr)
            }).catch(err=>{
                console.log(err)
            })
        }catch(err){
            reject(err)
        }
    })
}


module.exports = {
    createProduct: createProduct,
    getAllProduct: getAllProduct,
    findProduct: findProduct,
    getDetail: getDetail,
    findToBuy: findToBuy,
    searchProduct : searchProduct
}