const Products = require('../models/products');
const user = require('../models/user');
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
    res.render('shop/cart', {
      cart: user.cart,
      totalPrice
    });
  } catch (err) {
    next(err);
  }
}

module.exports.getIncreaseQuantity = async (req, res, next) => {
const { id } = req.params;
let cart = req.user.cart;
let indx;
cart.forEach((item, i) => {
  if (item.id == id) {
    indx = i;
  }
});

cart[indx].quantity++;
req.user.save();
try {
  let user = await Users.findOne({ _id: req.user._id }).populate("cart.id");
  let totalPrice = 0;
  user.cart.forEach((item) => {
    totalPrice += item.id.price * item.quantity;
  });
  res.send({
    id: user.cart,
    totalPrice,
  });
} catch (err) {
  next(err);
}
}
 
module.exports.getDecreaseQuantity = async (req, res, next) => {
  const { id } = req.params;
  let cart = req.user.cart;
  let indx;
  cart.forEach((item, i) => {
    if (item.id == id) {
      indx = i;
    }
  });
  // console.log(cart[indx].quantity);
  if (cart[indx].quantity > 1)
    cart[indx].quantity--;
  else if (cart[indx].quantity == 1)
    cart.splice(indx, 1);
  req.user.save();
  try {
    let user = await Users.findOne({ _id: req.user._id }).populate("cart.id");
    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalPrice += item.id.price * item.quantity;
    });
    res.send({
      id: user.cart,
      totalPrice,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getCartBuy = async (req, res, next) => {
  let user = await Users.findOne({ _id: req.user.id }).populate("cart.id");
  try {
    let totalPrice = 0;
    user.cart.forEach((item) => {
      totalPrice += item.id.price * item.quantity;
    });
    res.render("shop/buy", {
      cart: user.cart,
      totalPrice
    });
  } catch (err) {
    next(err);
  }
};

module.exports.postCartBuy = async (req, res, next) => {
  const { house, street, city, zipcode, phone, email, totalPrice } = req.body;
  console.log(house, street, city, zipcode, phone, email, totalPrice);
  try {
    let user = await Users.findOne({ _id: req.user._id })
    user.address.house = house;
    user.address.street = street;
    user.address.city = city;
    user.address.zipcode = zipcode;
    user.address.phone = phone;
    user.cart = [];
    console.log(user);
    console.log('User Address', user.address);
    await user.save();
    res.render('shop/order.hbs', {
      totalPrice
    })
  } catch (err) {
    next(err);
  }
}