module.exports = {


  friendlyName: 'Resetpassword',


  description: 'Resetpassword user.',


  inputs: {
    Password: {
      type: "string", 
      required: true,
    },
    token: {
      type: "string", 
      required: true,
    },
  },


  exits: {
    success: {
      statusCode: 200
    },
    invalidToken: {
      statusCode: 401
    },
  },


  fn: async function (inputs, exits) {
    if (!inputs.token) {
      return exits.invalidToken({
        error: "No token found.",
      });
    }
    var user = await Users.findOne({ PasswordResetToken: inputs.token });
    if (!user) {
      return exits.invalidToken({
        error: "No user found associated with the token.",
      });
    }
    if (user.passwordResetTokenExpiresAt <= Date.now()) {
      return exits.invalidToken({
        error: "Password reset token is expired.",
      });
    }
    const hashedPassword = await sails.helpers.passwords.hashPassword(
      inputs.Password
    );
    await Users.updateOne({ id: user.id }).set({
      Password: hashedPassword,
      PasswordResetToken: null,
      PasswordResetTokenExpiresAt: null,
    });
    const token = await sails.helpers.generateNewJwtToken(user.Email);
    this.req.user = user;
    return exits.success({
      data: user,
      message: `Password reset successful. ${user.Email} has been logged in`,
      token,
    });
  }
};
