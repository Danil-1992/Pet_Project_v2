const ResponseController = require('../controllers/comments.controller');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const responseRouter = require('express').Router();

responseRouter.get('/byGoodId/:goodId', ResponseController.getCommentsByGoodId);
responseRouter.post('/:goodId', verifyAccessToken, ResponseController.addComment);
responseRouter.get('/', verifyAccessToken, ResponseController.getAllResponses);

module.exports = responseRouter;
