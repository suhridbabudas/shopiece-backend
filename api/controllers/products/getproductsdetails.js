module.exports = {
  friendlyName: 'Getproductsdetails',
  description: 'Getproductsdetails products.',
  inputs: {
  },
  exits: {
    success: {
      statusCode: 200,
    },
    error: {
      statusCode: 400,
    }
  },
  fn: async function (exits) {
    const productID = this.req.params.id;
    try {
      const product = await Products.findOne({ id: productID });
      if (!product) {
        return this.res.status(200).json({});
      }
      const productSubType = await ProductsSubType.findOne({ id: product.ProductsSubTypeKey });
      if (!productSubType) {
        product['ProductsType'] = null;
        product['ProductsSubType'] = null;
        product['Brands'] = null;
        return this.res.status(200).json(product);
      }
      const productType = await ProductsType.findOne({ TypeCode: productSubType.TypeCode });
      if (!productType) {
        product['ProductsType'] = null;
        product['ProductsSubType'] = productSubType;
        product['Brands'] = null;
        return this.res.status(200).json(product);
      }
      const brand = await Brands.findOne({ id: product.BrandKey });
      if (!brand) {
        product['ProductsType'] = productType;
        product['ProductsSubType'] = productSubType;
        product['Brands'] = null;
        return this.res.status(200).json(product);
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
