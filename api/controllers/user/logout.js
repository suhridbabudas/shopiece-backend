module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {
    id:{
      type:"number",
      required: true
    }
  },


  exits: {
    success: {
      statusCode: 200
    },
    error: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      await Users.updateOne({ id: inputs.id }).set({
        UserJSONToken: null
      });
      return exits.success({
        statusCode: 200,
        message: "User Logged out.",
      });
    } catch (error) {
      return exits.error({
        error: error.message
      })
    }
  }
};
