module.exports = {
  friendlyName: 'Register',
  description: 'Register user.',
  inputs: {
    UserQualifer: {
      type: "number",
      required: true,
    },
    FirstName: {
      type: "string",
      required: true,
    },
    MiddleName: {
      type: "string",
    },
    LastName: {
      type: "string",
      required: true,
    },
    Email: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
    },
    Phone: {
      type: "string",
    },
    Password: {
      type: 'string',
      required: true,
      minLength: 8,
    },
    AvatarUrl: {
      type: "string",
    },
  },
  exits: {
    success: {
      statusCode: 201,
      description: 'New muna user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },
  },
  fn: async function (inputs, exits) {
    try {
      const userID = makeid(inputs.UserQualifer);
      const newEmailAddress = inputs.Email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');
      let newUser = await Users.create({
        UserID: userID,
        UserQualifer: inputs.UserQualifer,
        FirstName: inputs.FirstName,
        MiddleName: inputs.MiddleName,
        LastName: inputs.LastName,
        Email: newEmailAddress,
        EmailProofToken: token,
        EmailProofTokenExpiresAt:
          Date.now() + sails.config.custom.emailProofTokenTTL || parseInt(process.env.EMAIL_PROOF_TOKEN_TTL),
        Phone: inputs.Phone,
        Password: inputs.Password,
        PasswordResetToken: null,
        PasswordResetTokenExpiresAt: null,
        AvatarUrl: inputs.AvatarUrl ? inputs.AvatarUrl : null,
      }).fetch();
      if (newUser) {
        const confirmLink = `${sails.config.custom.baseUrl || process.env.BASE_URL}/user/confirm?token=${token}`;
        const email = {
          to: newUser.Email,
          subject: 'Confirm Your account',
          template: 'confirm',
          context: {
            name: `${newUser.FirstName}`,
            confirmLink: confirmLink,
          },
        };
        await sails.helpers.sendMail(email);
        return exits.success({
          newUser,
          message: `An account has been created for ${newUser.Email} successfully. Check your email to verify`,
        });
      }
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return exits.emailAlreadyInUse({
          message: 'Oops :) an error occurred',
          error: 'This email address already exits',
        });
      }
      return exits.error({
        message: 'Oops :) an error occurred',
        error: error.message,
      });
    }

    function makeid(qualifire) {
      let length = 5;
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      result = qualifire === 0 ? `ADMN-${result}` : `CUST-${result}`;
      return result.toUpperCase();
    }
  }


};
