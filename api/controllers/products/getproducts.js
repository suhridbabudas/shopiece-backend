module.exports = {
  friendlyName: 'Getproducts',
  description: 'Getproducts products.',
  inputs: {
  },
  exits: {
    error: {
      statusCode: 400
    }
  },
  fn: async function (exits) {
    console.log("API Call to: products/getproducts");
    const where = this.req.query && this.req.query.where ? JSON.parse(this.req.query.where) : {};
    const limit = this.req.query && this.req.query.limit ? parseInt(this.req.query.limit) : 30;
    const skip = this.req.query && this.req.query.skip ? parseInt(this.req.query.skip) : 0;
    try {
      const data = await Products.find({ where, limit, skip})
      return this.res.status(200).json([...data])
    } catch (error) {
      return exits.error({
        error: error.message
      })
    }
  }
};
