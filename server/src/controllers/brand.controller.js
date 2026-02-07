const BrandService = require('../services/brand.service');

class BrandController {
  static async getAllBrands(req, res) {
    try {
      const result = await BrandService.getAllBrands();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка при загрузке бренда' });
    }
  }
}

module.exports = BrandController;
