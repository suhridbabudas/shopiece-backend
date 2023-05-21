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
    ProductID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    Name: { type: "string", columnType: 'varchar(50)' },
    Description: { type: "string", columnType: 'varchar(255)' },
    ProductsTypeKey: { model: "ProductsType" },
    ProductsSubTypeKey: { model: "ProductsSubType" },
    Price: { type: "number", columnType: 'float' },
    IsOnOffer: { type: "number",columnType: 'integer', defaultsTo: 0 },
    OfferPrice: { type: "number", columnType: 'float' },
    Availability: { type: "number", columnType: 'integer' },
    ProcuctCondition: { type: "number", columnType: 'integer' },
    Rating: { type: "number", columnType: 'integer' },
    MaxRating: { type: "number", columnType: 'integer', defaultsTo: 5 },
    IsInWishlist: { type: "number", columnType: 'integer', defaultsTo: 0 },
    IsInCart: { type: "number", columnType: 'integer', defaultsTo: 0 },
    ProductImageUrl: { type: "string", columnType: 'varchar(255)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
