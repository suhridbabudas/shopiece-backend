/**
 * ProductsType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "ProductsType",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "ProductsTypeKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    TypeCode: { type: "string", unique: true, columnType: 'varchar(10)' },
    TypeName: { type: "string", columnType: 'varchar(100)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
