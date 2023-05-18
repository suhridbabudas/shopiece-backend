/**
 * DeliveryAddress.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "DeliveryAddress",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "DeliveryAddressKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    EnityKey: { type: "number", unique: true, columnType: 'integer' },
    UserQualifier: { type: "number", unique: true, columnType: 'integer' },
    DeliveryAddress1: { type: "string", columnType: 'varchar(60)' },
    DeliveryAddress2: { type: "string", columnType: 'varchar(60)' },
    DeliveryCity: { type: "string", columnType: 'varchar(30)' },
    DeliveryPin: { type: "string", columnType: 'varchar(10)' },
    DeliveryCountry: { type: "string", columnType: 'varchar(20)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
