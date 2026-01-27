const { Response, User } = require('../../db/models');
class ResponseService {
  static getResponsesByGoodId(good_id) {
    return Response.findAll({ where: { good_id }, include: { model: User } });
  }

  static async addComment(obj) {
    const res = await Response.create(obj);
    return Response.findOne({ where: { id: res.id }, include: { model: User } });
  }
}

module.exports = ResponseService;
