module.exports = {


  friendlyName: 'Getproducttype',


  description: 'Getproducttype products.',


  inputs: {

  },


  exits: {
    error: {
      statusCode: 400,
    }
  },


  fn: async function (inputs, exits) {
    try {
      const productTypes = await ProductsType.find();
      if (!productTypes) {
        return this.res.status(200).json([]);
      }
      return this.res.status(200).json([...productTypes]);
    } catch (error) {
      console.log(error);
      return exits.error({
        status: 400,
        message: error.message
      })
    }
  }
};
