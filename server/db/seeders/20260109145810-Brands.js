'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      {
        name: 'Nike',
        slug: 'nike',
        description: 'Американский производитель спортивной одежды, обуви и аксессуаров',
        logo: 'https://lh7-us.googleusercontent.com/docsz/AD_4nXcDtK9zYk_Dx_0KPyW4Y5HVA2Xx1niXstMeAXWX_9ctCRT_nHb5EGYpvn18t-e388W9R7H0jjN8EZ7lQVRvvKfcFp3caAtlH0hDq9C6KvHQS5cEuGma2eN2zaTK1s4AjP6ywzlujEfrDJZdKrycxmJwIzS2?key=uWEd7GgT7p_pa32DJcJS1A',
        website: 'https://www.nike.com',
        country: 'USA',
        metaTitle: 'Nike - купить оригинальную одежду и обувь',
        metaDescription:
          'Оригинальная продукция Nike: кроссовки, футболки, куртки. Бесплатная доставка по России.',
      },
      {
        name: 'Adidas',
        slug: 'adidas',
        description: 'Немецкий производитель спортивной одежды и обуви',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGLJC-hmcfN9t5pvZRmFrTBktTfr4lpdWKTA&s',
        website: 'https://www.adidas.com',
        country: 'Germany',
        metaTitle: 'Adidas - немецкое качество спортивной одежды',
        metaDescription:
          'Одежда и обувь Adidas: кроссовки, футболки, спортивные костюмы. Официальный дилер.',
      },
      {
        name: 'Zara',
        slug: 'zara',
        description: 'Испанская сеть магазинов модной одежды',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg',
        website: 'https://www.zara.com',
        country: 'Spain',
        metaTitle: 'Zara - модная одежда испанского бренда',
        metaDescription:
          'Актуальные коллекции одежды Zara для мужчин, женщин и детей. Быстрая доставка.',
      },
      {
        name: 'H&M',
        slug: 'h&m',
        description: 'Шведский бренд доступной модной одежды',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQD1akfc6gWL7AKs9Z_GaSDVVTM_yTqDExxg&s',
        website: 'https://www.hm.com',
        country: 'Sweden',
        metaTitle: 'H&M - модная одежда по доступным ценам',
        metaDescription:
          'Современная одежда H&M для всей семьи. Новые коллекции каждую неделю.',
      },
      {
        name: 'Uniqlo',
        slug: 'uniqlo',
        description: 'Японский бренд качественной повседневной одежды',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5vb7wReWlhdy-j3ZGyu4_fnjMBUKhphfsHw&s',
        website: 'https://www.uniqlo.com',
        country: 'Japan',
        metaTitle: 'Uniqlo - японское качество и минимализм',
        metaDescription:
          'Качественная базовая одежда Uniqlo: футболки, свитеры, куртки. Натуральные материалы.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Brands', null, {});
  },
};
