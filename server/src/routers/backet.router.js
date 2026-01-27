const BacketController = require("../controllers/backet.controller")
const verifyAccessToken = require("../middlewares/verifyAccessToken")

const backetRouter = require("express").Router()

backetRouter.get("/byuser", verifyAccessToken, BacketController.getGoodsByUserId)
backetRouter.delete("/frombacket", verifyAccessToken, BacketController.clearBacket)
backetRouter.post("/:goodId", verifyAccessToken, BacketController.addToBacket)
backetRouter.delete("/:goodId", verifyAccessToken, BacketController.deleteFromBacket)


module.exports = backetRouter