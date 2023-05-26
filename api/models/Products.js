/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Products",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "ProductsKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    ProductID: { type: "string", unique: true, columnType: 'varchar(20)', allowNull: false },
    ProductsSubTypeKey: { model: "ProductsSubType", },
    BrandKey: { model: "Brands", },
    Name: { type: "string", columnType: 'varchar(255)', allowNull: true },
    Description: { type: "string", columnType: 'varchar(2000)' , allowNull: true},
    Price: { type: "number", columnType: 'float', allowNull: true },
    IsOnOffer: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    IsInWishlist: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    IsInCart: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    IsTrending: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    IsPopular: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    IsNewSeason: { type: "number", columnType: 'integer',isIn: [0,1], defaultsTo: 0 },
    OfferPrice: { type: "number", columnType: 'float', allowNull: true },
    Availability: { type: "number", columnType: 'integer' },
    ProductCondition: { type: "string", columnType: 'varchar(100)',isIn: ['New', 'Used', 'Refurbished'], },
    Rating: { type: "number", columnType: 'integer' },
    MaxRating: { type: "number", columnType: 'integer', defaultsTo: 5 },
    ProductImageUrl: { type: "string", columnType: 'varchar(255)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
