const Products = require('../models/products');

module.exports.postProductsAdd = async (req, res, next) => {
    const { name, price, description, imageUrl, seller, category } = req.body;
    try {
        await Products.create({
            name,
            price,
            description,
            imageUrl,
            seller,
            category
        });
        res.redirect('/admin/products/all');
    }
    catch(err){
        res.send(err)
    }
}
module.exports.getProductsAdd = async (req, res, next)=>{
    try {
        res.render("admin/add_products");
    }
    catch (err) {
        res.send(err);
    }
}
module.exports.getProductsAll = async (req, res, next) => {
    const products = await Products.find();
    let data = {};

    products.forEach((product) => {
        let arr = data[product.category] || [];
        arr.push(product);
        data[product.category] = arr;
    });
    res.render('admin/home',{products:data,isAdmin:true});
}

module.exports.getProductUpdate = async (req, res, next)=>{
    let { id } = req.params;
    try {
    const product = await Products.findById(id)
    res.render('admin/update_product',{product});
    }
    catch (err) {
        next(err);
    }
}

module.exports.postProductUpdate = async (req, res)=>{
    let { name, price, imageUrl, seller, description, category, id } = req.body;
    
    try {
        const product = await Products.findById(id);

        product.name = name;
        product.price = price;
        product.imageUrl = imageUrl;
        product.seller = seller;
        product.description = description;
        product.category = category;

        await product.save();
        res.redirect("/admin/products/all");
    }
    catch (err) {
        next(err);
    }

}
module.exports.getProductDelete = async (req, res, next)=>{
    let { id } = req.params;
    try {
        await Products.findByIdAndDelete(id);
        res.redirect('/admin/products/all');
    }
    catch (err) {
        next(err);
    }
}
