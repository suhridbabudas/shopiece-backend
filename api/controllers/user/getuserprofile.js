module.exports = {


  friendlyName: 'Getuserprofile',


  description: 'Getuserprofile user.',


  inputs: {
    // id:{
    //   type: "number",
    //   required: true
    // }
  },


  exits: {
    success:{
      statusCode: 200,
    },
    notFound:{
      statusCode: 404
    },
    error:{
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try{
      // const user = await Users.findOne({id: inputs.id});
      const user = this.req.user;
      if(!user){
        return exits.notFound({
          message: "User not found",
        })
      }
      return exits.success({
        user,
      })

    } catch(error){
      return exits.error({
        error: error.message
      })
    }
  }


};
