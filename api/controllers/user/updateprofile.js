module.exports = {


  friendlyName: 'Updateprofile',


  description: 'Updateprofile user.',


  inputs: {
    id: {
      type: "number",
      required: true
    },
    FirstName: {
      type: "string",
    },
    MiddleName: {
      type: "string",
    },
    LastName: {
      type: "string",
    },
    Email: {
      type: "string",
    },
    Phone: {
      type: "string",
    },
    Password: {
      type: "string",
    },
    AvatarUrl: {
      type: "string",
    },
  },


  exits: {
    success: {
      statusCode: 200
    },
    noUserFound: {
      statusCode: 404
    },
    invalidField: {
      statusCode: 400
    },
    error: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    const allowToUpdate = ["FirstName", "MiddleName", "LastName", "Phone", "Email", "Password", "AvatarUrl"];
    let updates = Object.keys(inputs);
    updates.splice(updates.indexOf('id'),1);
    let isAllowed = updates.every((update) => allowToUpdate.includes(update));
    if (!isAllowed) {
      return exits.invalidField({
        statusCode: 400,
        allowToUpdate,
        userRequest: updates,
        message: "Invalid field.",
      })
    }
    const user = await Users.findOne({ id: inputs.id });
    if (!user) {
      return exits.noUserFound({
        message: 'No User Found.'
      })
    }
    const updateObj = Object.assign(inputs);
    delete updateObj.id;
    try {
      const updatedUser = await Users.updateOne({ id: user.id }).set(updateObj);
      return exits.success({
        updatedUser,
        message: "Profile updated.",
      });
    } catch (error) {
      return exits.error({
        error: error.message
      })
    }
  }
};
