const verifyAccessToken = require('../middlewares/verifyAccessToken');
const BrandController = require('../controllers/brand.controller');

const brandRouter = require('express').Router();

brandRouter.get('/', verifyAccessToken, BrandController.getAllBrands);

module.exports = brandRouter;
