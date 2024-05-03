const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controller/shop");
// const {route}= require('./admin')
router.get('/', shopController.getHome)
router.get('/product/details/:id', shopController.getProductById);
router.get("/cart/add/:id", shopController.getProductAddById);
router.get("/cart", shopController.getCart);
router.get("/cart/buy", shopController.getCartBuy);
router.get("/cart/increase/:id", shopController.getIncreaseQuantity);
router.get("/cart/decrease/:id", shopController.getDecreaseQuantity);
// router.get("/products/all", shopController.getProductsAll);

module.exports = router;