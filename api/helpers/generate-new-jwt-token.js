const jwt = require("jsonwebtoken");

module.exports = {
  friendlyName: 'Generate new jwt token',
  description: '',
  inputs: {
    subject: {
      type: "string",
      required: true
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs, exits) {
    const payload = {
      subject: inputs.subject,
      iss: "Shopiece New App"
    };
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: sails.config.jwtTokenExp });
    return exits.success({
      token
    })
  }
};

