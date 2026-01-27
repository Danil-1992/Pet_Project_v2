'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Мужская одежда',
        slug: 'mens-clothing',
        description: 'Стильная и удобная одежда для мужчин',
        image:
          'https://www.menslife.com/upload/images/2021/01.2021/%D0%BC%D1%83%D0%B6%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BF%D0%B0%D0%BB%D1%8C%D1%82%D0%BE%20%D0%B7%D0%B8%D0%BC%D0%B0.jpg',
        metaTitle: 'Мужская одежда - купить в интернет-магазине',
        metaDescription:
          'Широкий выбор мужской одежды: футболки, джинсы, куртки, рубашки. Доставка по всей России.',
      },
      {
        name: 'Женская одежда',
        slug: 'womens-clothing',
        description: 'Модная женская одежда на любой вкус',
        image: 'https://storage.yandexcloud.net/elyts-prod/medialibrary/d06/1M.jpeg',
        metaTitle: 'Женская одежда - модные тенденции сезона',
        metaDescription:
          'Огромный выбор женской одежды: платья, блузки, юбки, брюки. Новые коллекции каждый месяц.',
      },
      {
        name: 'Детская одежда',
        slug: 'kids-clothing',
        description: 'Качественная и безопасная одежда для детей',
        image: 'https://hardy.com.ua/image/cache/catalog/blog/mysun_3-900x600.jpg',
        metaTitle: 'Детская одежда - для мальчиков и девочек',
        metaDescription:
          'Детская одежда от ведущих брендов. Яркие цвета, натуральные ткани, удобные фасоны.',
      },
      {
        name: 'Аксессуары',
        slug: 'accessories',
        description: 'Стильные аксессуары для завершения образа',
        image:
          'https://favoritti.com/upload/iblock/d7a/d7a130622403c3dd445709b4e9631637.jpg',
        metaTitle: 'Аксессуары - сумки, ремни, головные уборы',
        metaDescription:
          'Модные аксессуары: сумки, ремни, перчатки, шарфы. Подчеркните свой индивидуальный стиль.',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
