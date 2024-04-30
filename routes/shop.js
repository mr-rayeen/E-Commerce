const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controller/shop");
// const {route}= require('./admin')
router.get('/', shopController.getHome)
router.get('/product/details/:id', shopController.getProductById);
router.get("/cart/add/:id", shopController.getProductAddById);
router.get("/cart", shopController.getCart);

// router.get("/products/all", shopController.getProductsAll);

module.exports = router;