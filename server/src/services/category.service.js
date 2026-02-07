const { Category } = require('../../db/models');

class CategoryService {
  static getAllCategory() {
    return Category.findAll();
  }
}

module.exports = CategoryService;
