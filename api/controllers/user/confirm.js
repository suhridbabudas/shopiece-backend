module.exports = {
  friendlyName: 'Confirm',
  description: 'Confirm user.',
  inputs: {
    token: {
      type: 'string'
    },
  },
  exits: {
    success: {
      statusCode: 200,
      description: "Email address confirmed. Please login.",
    },
    noTokenPresent: {
      statusCode: 200,
    },
    noAssociateUser: {
      statusCode: 200,
    },
    invalidOrExpiredToken: {
      statusCode: 200,
      description:
        "The provided token is expired, invalid, or already used.",
    },
    error: {
      statusCode: 500,
      description:
        "The provided token is expired, invalid, or already used.",
    },
  },

  fn: async function (inputs, exits) {
    try {
      if (!inputs.token) {
        return exits.noTokenPresent({
          error: "No token found",
        });
      }
      const user = await Users.findOne({ EmailProofToken: inputs.token });
      if (!user) {
        return exits.noAssociateUser({
          error: "User not found for the associated token.",
        });
      }
      if (user.EmailProofTokenExpiresAt <= Date.now()) {
        return exits.invalidOrExpiredToken({
          error: "The provided token is expired, invalid, or already used up.",
        });
      }
      if (user.EmailStatus === "unconfirmed") {
        try {
          await Users.updateOne({ id: user.id }).set({
            EmailStatus: "confirmed",
            EmailProofToken: null,
            EmailProofTokenExpiresAt: null,
          });
          return exits.success({
            message: "Your account has been verified.",
          });
        } catch (error) {
          return exits.error({
            error: error.message
          })
        }
      }
    } catch (error) {
      return exits.error({
        error: error.message
      })
    }
  }
};
