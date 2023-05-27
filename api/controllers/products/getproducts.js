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
    const where = this.req.query && this.req.query.where ? JSON.parse(this.req.query.where) : null;
    const limit = this.req.query && this.req.query.limit ? parseInt(this.req.query.limit) : null;
    const skip = this.req.query && this.req.query.skip ? parseInt(this.req.query.skip) : null;
    let query = {};
    if(where){
      query['where'] = where;
    }
    if(limit){
      query['limit'] = limit;
    }
    if(skip){
      query['skip'] = skip;
    }
    try {
      let data = await Products.find(query)
      if (!data) {
        return this.res.status(200).json([])
      }
      const brand = await Brands.find();
      let productList =[];
      data.forEach(product => {
        brand.forEach(brand => {
          if(brand.id === product.BrandKey){
            product['Brand'] = brand;
            productList.push(product);
          }
        })
      })
      return this.res.status(200).json([...productList])
    } catch (error) {
      return this.res.status(500).json({error: error.message})
    }
  },
};
