/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Orders",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "OrderKey",
      unique: true,
      columnType: 'integer',
      autoIncrement: true,
    },
    OrderID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    UserID: { type: "string", unique: true, allowNull: false, columnType: 'varchar(10)' },
    OrderDate: { type: "ref", columnType: "date" },
    PaymemtMethod: { type: "string", columnType: 'varchar(15)' },
    IvoiceNumber: { type: "string", columnType: 'varchar(10)' },
    TotalOrderAmount: { type: "number", columnType: 'float' },
    BillingAddress1: { type: "string", columnType: 'varchar(60)' },
    BillingAddress2: { type: "string", columnType: 'varchar(60)' },
    BillingCity: { type: "string", columnType: 'varchar(30)' },
    BillingPin: { type: "string", columnType: 'varchar(10)' },
    BillingCountry: { type: "string", columnType: 'varchar(20)' },
    CreatedAt: { type: "ref", columnType: "date", autoCreatedAt: true },
    UpdatedAt: { type: "ref", columnType: "date", autoUpdatedAt: true },
  },
};
