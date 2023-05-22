module.exports = {
  friendlyName: 'Login',
  description: 'Login user.',
  inputs: {
    Email: {
      type: "string",
      required: true,
    },
    Password: {
      type: "string",
      required: true,
    },
  },
  exits: {
    success: {
      statusCode: 200,
      description: "Login successful",
    },
    notAUser: {
      statusCode: 404,
      description: "User not found",
    },
    passwordMismatch: {
      statusCode: 401,
      description: "Password do not match",
    },
    operationalError: {
      statusCode: 400,
      description: 'The request was formed properly'
    },
    sessionTimeOut: {
      statusCode: 401,
      description: 'Session timeout'
    }
  },
  fn: async function (inputs, exits) {
    console.log("API Call to: user/login");
    try {
      const user = await Users.findOne({ Email: inputs.Email });
      if (!user) {
        return exits.notAUser({
          error: `User not found`,
        });
      }
      await sails.helpers.passwords
        .checkPassword(inputs.Password, user.Password)
        .intercept('incorrect', (error) => {
          exits.passwordMismatch({ error: error.message });
        });
      const jwtToken = await sails.helpers.generateNewJwtToken(user.Email);
      await Users.updateOne({ id: user.id }).set({
        UserJSONToken: jwtToken.token
      });
      const menu = await Menu.find({ UserQualifier: user.UserQualifier })
      this.req.me = user;
      return exits.success({
        data: user,
        menu,
        message: `User login successful.`,
        token: jwtToken.token,
      });
    } catch (error) {
      sails.log.error(error);
      if (error.isOperational) {
        return exits.operationalError({
          message: `Error logging in user ${inputs.Email}`,
          error: error.raw,
        });
      }
      return exits.error({
        message: `Error logging in user ${inputs.Email}`,
        error: error.message,
      });
    }
  }
};
