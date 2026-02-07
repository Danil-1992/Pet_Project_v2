const CategoryService = require('../services/category.service');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const result = await CategoryService.getAllCategory();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при загрузке категорий' });
    }
  }
}

module.exports = CategoryController;
