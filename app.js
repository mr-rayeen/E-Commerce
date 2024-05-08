const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const mongoose = require('mongoose'); 
const hbs = require('hbs');
const User = require('./models/user');
const Products = require('./models/products')

app.use(async (req, res, next)=>{
    let user = await User.findOne({
      _id: "662f9937da28288814294545"
    });
    req.user = user;
    next();
})

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//  Registering Partials
hbs.registerPartials(__dirname + '/views/partials');

// Routes
// /admin, /admin/abc, /admin/abc/def, /admin/abc/../../
//  Admin Page Route
const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

app.use('/admin', adminRouter);

//  Shop Page Route
app.use('/shop', shopRouter);

app.get('/', async (req, res) => {
    try {
        let products = await Products.find();
        res.render('index', {
            products
        });

    } catch (err) {
        next(err)
    }
})


mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    });
}).catch(err => {
    console.log(err)
})