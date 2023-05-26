/**
 * Brands.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Brands",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "BrandKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    BrandCode: { type: "string", unique: true, columnType: 'varchar(10)' },
    BrandName: { type: "string", columnType: 'varchar(30)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};

