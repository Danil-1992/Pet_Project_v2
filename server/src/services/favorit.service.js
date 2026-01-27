const { Favorit } = require('../../db/models');

class FavoritService {
  static getFavorits(user_id) {
    return Favorit.findAll({
      where: {
        user_id,
      },
    });
  }

  static addLike(user_id, good_id) {
    return Favorit.create({ user_id, good_id });
  }

  static deleteLike(user_id, good_id) {
    return Favorit.destroy({ where: { user_id, good_id } });
  }
}

module.exports = FavoritService;
