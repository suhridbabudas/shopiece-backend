module.exports = {


  friendlyName: 'Forgotpassword',


  description: 'Forgotpassword user.',


  inputs: {
    Email: {
      type: "string",
      required: true,
    },
  },


  exits: {
    success: {
      ststusCode: 200
    },
    error: {
      statusCode: 404
    }
  },


  fn: async function (inputs, exits) {
    var user = await Users.findOne({ Email: inputs.Email });
    if (!user) {
      return exits.error({
        statusCode: 404,
        message: 'User not found.'
      })
    }
    const token = await sails.helpers.strings.random("url-friendly");
    await Users.update({ id: user.id }).set({
      PasswordResetToken: token,
      PasswordResetTokenExpiresAt:
        Date.now() + sails.config.custom.passwordResetTokenTTL || parseInt(process.env.PASSWORD_RESET_TOKEN_TTL),
    });
    const recoveryLink = `${sails.config.custom.baseUrl || process.env.BASE_URL}/user/resetpassword?token=${token}`;
    const email = {
      to: user.Email,
      subject: "Reset Password",
      template: "forgotpassword",
      context: {
        name: user.FirstName,
        recoverLink: recoveryLink,
      },
    };
    try {
      await sails.helpers.sendMail(email);
    } catch (error) {
      sails.log(error);
    }
    return exits.success({
      message: `A reset password email has been sent to ${user.Email}.`,
    });
  }
};
