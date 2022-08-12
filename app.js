const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv/config')
const morgan = require("morgan")

const adminRouter = require('./modules/admins/adminRouter')
const userRouter = require('./modules/users/userRouter')
const categoryRouter = require('./modules/categories/categoryRouter')
const subCategoryRouter = require('./modules/sub categories/subCategoryRouter')
const productRouter = require('./modules/products/productRouter')
const cartRouter = require('./modules/carts/cartRouter')
const orderRouter = require('./modules/orders/orderRouter')
const imageRouter = require('./modules/images/imageRouter')
const orderItemRouter = require('./modules/orderItems/orderItemRouter')
const otherRouter = require('./modules/other/otherRouter')
const modelRouter = require('./modules/models/modelRouter')
const dummyRouter = require('./modules/dummy/dummyRouter')


app.use(cors())

// for displaying http requests on the console 
app.use(morgan('combined'))
app.use(express.json());
app.use(express.urlencoded())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))

const api = process.env.API_URL
app.use(`${api}/admin`, adminRouter)
app.use(`${api}/user`, userRouter)
app.use(`${api}/category`, categoryRouter)
app.use(`${api}/subCategory`, subCategoryRouter)
app.use(`${api}/product`, productRouter)
app.use(`${api}/cart`, cartRouter)
app.use(`${api}/order`, orderRouter)
app.use(`${api}/image`, imageRouter)
app.use(`${api}/orderitem`, orderItemRouter)
app.use(`${api}/other`, otherRouter)
app.use(`${api}/model`, modelRouter)
app.use(`${api}/dummy`, dummyRouter)

mongoose.connect('mongodb://localhost:27017/clothes-shope');
app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})