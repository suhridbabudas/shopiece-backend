/**
 * AddressMaster.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "AddressMaster",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "AddressMasterKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    UserKey: { type: "number", unique: true, allowNull: false, columnType: 'integer' },
    UserID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    UserQualifier: { type: "number", columnType: 'integer' },
    ResidentialAddress1: { type: "string", columnType: 'varchar(60)' },
    ResidentialAddress2: { type: "string", columnType: 'varchar(60)' },
    ResidentialCity: { type: "string", columnType: 'varchar(30)' },
    ResidentialPin: { type: "string", columnType: 'varchar(10)' },
    ResidentialCountry: { type: "string", columnType: 'varchar(20)' },
    DeliveryAddressKey: { model: "DeliveryAddress" },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
