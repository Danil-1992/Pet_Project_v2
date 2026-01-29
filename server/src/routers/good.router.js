const GoodController = require('../controllers/good.controller');

const goodRouter = require('express').Router();

goodRouter.get('/all', GoodController.getAllGoods);
goodRouter.get('/add/:goodId', GoodController.addToBacket);
goodRouter.get('/delete/:goodId', GoodController.deleteFromBacket);
goodRouter.get('/:id', GoodController.getOneCard);

module.exports = goodRouter;
