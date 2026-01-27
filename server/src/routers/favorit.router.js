const FavoritControoler = require('../controllers/favorit.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const favoritRouter = require('express').Router();

favoritRouter.get('/byuser', verifyAccessToken, FavoritControoler.getFavorits);
favoritRouter.post('/:goodId', verifyAccessToken, FavoritControoler.addLike);
favoritRouter.delete('/:goodId', verifyAccessToken, FavoritControoler.deleteLike);

module.exports = favoritRouter;
