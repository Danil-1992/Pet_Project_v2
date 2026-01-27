const OrderController = require("../controllers/order.controller")
const verifyAccessToken = require("../middlewares/verifyAccessToken")

const orderRouter = require("express").Router()

orderRouter.post("/", verifyAccessToken, OrderController.addOrder)

module.exports = orderRouter
