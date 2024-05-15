const Products = require("../models/products");

module.exports.getHomePage = async (req, res) => {
  try {
    let products = await Products.find();
    res.render("index", {
      products,
    });
  } catch (err) {
    next(err);
  }
};