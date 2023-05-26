module.exports = {


  friendlyName: 'Getproductsdetails',


  description: 'Getproductsdetails products.',


  inputs: {

  },


  exits: {
    error: {
      statusCode: 400,
    }
  },


  fn: async function (exits) {
    const productID = this.req.params.id;
    try {
      const product = await Products.findOne({ id: productID });
      if (!product) {
        return exits.error({
          status: 200,
          product: {}
        })
      }
      const productSubType = await ProductsSubType.findOne({ id: product.ProductsSubTypeKey });
      if (!productSubType) {
        product['ProductsType'] = null;
        product['ProductsSubType'] = null;
        product['Brands'] = null;
        return exits.error({
          status: 200,
          product
        })
      }
      const productType = await ProductsType.findOne({ TypeCode: productSubType.TypeCode });
      if (!productType) {
        product['ProductsType'] = null;
        product['ProductsSubType'] = productSubType;
        product['Brands'] = null;
        return exits.error({
          status: 200,
          product
        })
      }
      const brand = await Brands.findOne({ id: product.BrandKey });
      if (!brand) {
        product['ProductsType'] = productType;
        product['ProductsSubType'] = productSubType;
        product['Brands'] = null;
        return exits.error({
          status: 200,
          product
        })
      }
      product['ProductsType'] = productType;
      product['ProductsSubType'] = productSubType;
      product['Brands'] = brand;
      return this.res.status(200).json(product);
    } catch (error) {
      return exits.error({
        status: 400,
        message: error.message
      })
    }
  }
};
