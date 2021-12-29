let express = require("express")
let bodyParser = require("body-parser")
let cors = require("cors")
let initWebRoutes = require("./Routes/router")
let dotenv = require("dotenv")
let mongoose = require("mongoose")
let app = express()

app.use(cors())
dotenv.config()

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    console.log("connect to DB");
})
.catch((err) => {
    console.log(err);
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
initWebRoutes(app)


let port = process.env.PORT || 8080
app.listen(port,()=>{
    console.log("app is running on port " + port)
})