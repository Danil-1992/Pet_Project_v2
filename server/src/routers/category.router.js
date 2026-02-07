const CategoryController = require('../controllers/category.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const categoryRouter = require('express').Router();

categoryRouter.get('/', verifyAccessToken, CategoryController.getAllCategories);

module.exports = categoryRouter;
