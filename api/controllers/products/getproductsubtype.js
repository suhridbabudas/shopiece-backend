module.exports = {


  friendlyName: 'Getproductsubtype',


  description: 'Getproductsubtype products.',


  inputs: {

  },


  exits: {
    error: {
      statusCode: 400,
    }
  },


  fn: async function (inputs) {
    try {
      const productSubTypes = await ProductsSubType.find();
      if (!productSubTypes) {
        return this.res.status(200).json([]);
      }
      return this.res.status(200).json([...productSubTypes]);
    } catch (error) {
      console.log(error);
      return exits.error({
        status: 400,
        message: error.message
      })
    }
  }
};
