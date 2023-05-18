/**
 * AccountSettings.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "AccountSettings",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "AccountSettingsKey",
      unique: true,
      columnType: "integer",
      autoIncrement: true,
    },
    AccountSettingsID: {
      type: "string",
      unique: true,
      allowNull: false,
      columnType: 'varchar(20)',
    },
    UserID: {
      type: "string",
      unique: true,
      allowNull: false,
      columnType: 'varchar(10)',
    },
    UserKey: { model: "Users" },
    AddressMasterKey: { model: "AddressMaster" },
    AccountStatus: { type: "boolean" },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
