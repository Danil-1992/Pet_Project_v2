const ResponseService = require('../services/comments.service');

class ResponseController {
  static async getCommentsByGoodId(req, res) {
    try {
      const { goodId } = req.params;
      const result = await ResponseService.getResponsesByGoodId(goodId);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при получении комментариев' });
    }
  }

  static async addComment(req, res) {
    try {
      const { user } = res.locals;
      const { goodId } = req.params;
      const { comment } = req.body;
      const result = await ResponseService.addComment({
        comment,
        user_id: user.id,
        good_id: goodId,
      });
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при добавлении комментария' });
    }
  }

  static async getAllResponses(req, res) {
    try {
      const { user } = res.locals;
      const data = await ResponseService.getAllResponses(user.id);
      res.json(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = ResponseController;
