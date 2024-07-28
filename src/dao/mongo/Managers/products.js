import productModel from "../models/product.js";

export default class ProductsManager {
  getProducts = (limit, page) => {
    const result = productModel.paginate(
      {},
      { page, limit: limit, lean: true }
    );
    return result;
  };

  getProductsPage = (limit, page, query, sort) => {
    const queryAsNumber = parseInt(query, 10);
    const isNumber = !isNaN(queryAsNumber);
    
    const searchConditions = []

    if (isNumber) {
        searchConditions.push({ stock: queryAsNumber });
    } else {
        searchConditions.push(
            { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } },
        )
    }

    return productModel.paginate(
      {
        $or: searchConditions,
      },
      {
        limit,
        page,
        sort: { price: sort },
      }
    );
  };

  getProductById = (params) => {
    return productModel.findOne(params).lean();
  };

  findByCode = (code) => {
    return productModel.findOne({ code: code });
  };

  createProduct = (product) => {
    return productModel.create(product);
  };

  updateProduct = (id, product) => {
    return companyModel.findByIdAndUpdate(id, product, { new: true });
  };

  deleteProduct = (id) => {
    return productModel.findByIdAndDelete(id);
  };
}
