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

    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalPrice += item.id.price*item.quantity;
    })
    console.log(user.cart);
    console.log(user.cart.id._id);
    let idString = JSON.stringify(user.cart.id._id);
    res.render('shop/cart', {
      cart: user.cart,
      totalPrice,
      idString
    });
  } catch (err) {
    next(err);
  }
}

module.exports.getIncreaseQuantity = async (req, res, next) => {
  let pdid = req.params;
  const user = await Users.findOne({ _id: req.user._id }).populate('cart.id');
  if (user.cart.id == pdid) {
    user.cart.quantity++;
  }
  await user.save();
  res.send(user.cart);
}
module.exports.getCartBuy = async(req, res, next) => {
  let user = await Users.findOne({ _id: req.user.id }).populate('cart.id');
  
}