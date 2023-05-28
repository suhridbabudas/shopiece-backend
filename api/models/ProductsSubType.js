/**
 * ProductsSubType.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "ProductsSubType",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "ProductsSubTypeKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    TypeCode: { type: "string", columnType: 'varchar(15)' },
    SubTypeCode: { type: "string", unique: true, columnType: 'varchar(15)' },
    SubTypeCodeName: { type: "string", columnType: 'varchar(100)' },
    URL:{ type: "string", columnType: 'varchar(255)' },
    SubTypeImgURL: { type: "string", columnType: 'varchar(255)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
