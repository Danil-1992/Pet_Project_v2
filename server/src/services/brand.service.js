const { Brand } = require('../../db/models');

class BrandService {
  static getAllBrands() {
    return Brand.findAll();
  }
}

module.exports = BrandService;
