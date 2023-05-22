/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "Users",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "UserKey",
      columnType: 'integer',
      autoIncrement: true,
    },
    UserID: { 
      type: "string", 
      unique: true, 
      allowNull: false, 
      columnType: 'varchar(10)' 
    },
    UserQualifier: { 
      type: "number", 
      columnType: 'integer' 
    },
    FirstName: { 
      type: "string", 
      columnType: 'varchar(20)' 
    },
    MiddleName: { 
      type: "string", 
      columnType: 'varchar(20)' 
    },
    LastName: { 
      type: "string", 
      columnType: 'varchar(20)' 
    },
    Email: { 
      type: "string", 
      required: true, 
      unique: true, 
      columnType: 'varchar(50)' 
    },
    EmailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
      columnType: 'varchar(30)'
    },
    EmailProofToken: {
      type: 'string',
      allowNull: true
    },
    EmailProofTokenExpiresAt: {
      type: 'number',
      allowNull: true
    },
    Phone: { 
      type: "string", 
      columnType: 'varchar(15)',
      allowNull: true
    },
    Password: { 
      type: "string", 
      columnType: 'varchar(255)' 
    },
    PasswordResetToken: {
      type: 'string',
      allowNull: true
    },
    PasswordResetTokenExpiresAt: {
      type: 'number',
      allowNull: true
    },
    AvatarUrl: { 
      type: "string", 
      columnType: 'varchar(255)',
      allowNull: true
    },
    UserJSONToken:{
      type: "string",
      allowNull: true
    },
    CreatedAt: { 
      type: "ref", 
      columnType: "date", 
      autoCreatedAt: true 
    },
    UpdatedAt: { 
      type: "ref", 
      columnType: "date", 
      autoUpdatedAt: true 
    },
  },
  customToJSON: function () {
    return _.omit(this, [
      "Password",
      "PasswordResetToken",
      "PasswordResetTokenExpiresAt",
      "EmailProofToken",
      "EmailProofTokenExpiresAt",
      "UserJSONToken"
    ]);
  },
  beforeCreate: async function (values, proceed) {
    // Hash password
    values.UserQualifier = values.UserID.indexOf('CUST') !== -1 ? 1 : 0;
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      values.Password
    );
    values.Password = hashedPassword;
    return proceed();
  },
};
