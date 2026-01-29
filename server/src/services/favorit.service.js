const { Favorit, Good } = require('../../db/models');

class FavoritService {
  static getAllFavoritsByUserId(user_id) {
    return Favorit.findAll({ where: { user_id }, include: { model: Good } });
  }

  static addLike(user_id, good_id) {
    return Favorit.create({ user_id, good_id });
  }

  static deleteLike(user_id, good_id) {
    return Favorit.destroy({ where: { user_id, good_id } });
  }

  static getFavoritByPk(id) {
    return Favorit.findByPk(id, { include: { model: Good } });
  }
}

module.exports = FavoritService;
