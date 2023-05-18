/**
 * OrderDetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "OrderDetails",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "OrderDetailsKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    OrderID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    OrderKey: { model: "Orders" },
    ProductID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    ProductsKey: { model: "Products" },
    ProductCount: { type: "number", columnType: 'integer' },
    AmountPerProduct: { type: "number", columnType: 'float' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
