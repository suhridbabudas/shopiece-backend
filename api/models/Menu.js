/**
 * Menu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Menu",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "MenuKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    UserQualifier: { type: "number", columnType: 'integer', },
    MenuCode: { type: "string", unique: true, columnType: 'varchar(10)' },
    MenuName: { type: "string", columnType: 'varchar(30)' },
    URL: { type: "string", columnType: 'varchar(255)' },
    MenuOrder: { type: "number", columnType: 'integer' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
  customToJSON: function () {
    return _.omit(this, [
      "CreatedAt",
      "UpdatedAt"
    ]);
  },
};

