let express = require("express")
let router = express.Router()
let homeController = require("../Controller/homeController")


let initWebRoutes=(app)=>{
    router.get("/",homeController.getHome)
    router.post("/create-product",homeController.createProduct)
    router.post("/get-all-product",homeController.getAllProduct)
    router.post("/find-product",homeController.findProduct)
    router.post("/get-detail", homeController.getDetail)
    router.post("/get-tobuy",homeController.getToBuy)
    router.get("/get-all-order", homeController.getAllOrder)
    router.post("/create-order",homeController.createOrder)
    router.post("/search-order", homeController.searchOrder)
    router.post("/login", homeController.login)
    router.post("/delete-order", homeController.deleteOrder)
    router.post("/change-status", homeController.changeStatus)
    router.post("/search-product", homeController.searchProduct)

    return app.use("/",router)
}

module.exports = initWebRoutes