const Products = require('../models/products');
const Users = require('../models/user');

module.exports.getProductsAll = async (req, res, next)=>{
    try {
        let product = await Products.find({});
        const { getProductCategoryWise } = require('../utils/library');

        let categoryProducts = getProductCategoryWise(products);

    }
    catch (err) {
        next(err);
    }
}

module.exports.getHome = async (req, res, next) => {
  try {
    let products = await Products.find({});
    const { getProductCategoryWise } = require("../utils/library");

      let categoryProducts = getProductCategoryWise(products);
      res.render("shop/home", {
        products: categoryProducts,
        isAdmin: false
      });
  } catch (err) {
    next(err);
  }
};

module.exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
    let product = await Products.findOne({ _id: id });
    res.render('shop/product-details', {
        product
    })
}

module.exports.getProductAddById= async (req, res, next)=>{
 try {
        const { id } = req.params;
        let cart = req.user.cart;
        let indx = -1;
        cart.forEach((item, i) => {
            if (item.id == id) {
                indx = i;
            }
        })
        if (indx == -1) {
            cart.unshift({
                id: id,
                quantity: 1
            })
        }
        else {
            cart[indx].quantity++;
        }

        // To make sure that db mei changes ho jaaye we need to save it
        await req.user.save();
        res.redirect('/shop/cart');
    } catch (err) {
        next(err);
    }
}

module.exports.getCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    let user = await Users.findOne({ _id: req.user._id }).populate("cart.id");
    console.log(user.cart);
    res.render('shop/cart', {
      cart: user.cart
    });
  } catch (err) {
    next(err);
  }
}