/**
 * Stocks.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Stocks",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "StocksKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    ProductsTypeKey: { model: "ProductsType" },
    ProductsSubTypeKey: { model: "ProductsType" },
    ProcuctCount: { type: "number", columnType: 'integer' },
    InStock: { type: "boolean" },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
