const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Lấy tất cả sản phẩm
router.get('/', async (req, res) => {
    const products = await Product.find().sort({ ProductStoreCode: -1 });
    res.render('products', { products });
});

// Thêm sản phẩm mới
router.post('/add', async (req, res) => {
    const { ProductCode, ProductName, ProductDate, ProductOriginPrice, Quantity, ProductStoreCode } = req.body;
    const newProduct = new Product({
        ProductCode,
        ProductName,
        ProductDate,
        ProductOriginPrice,
        Quantity,
        ProductStoreCode
    });
    await newProduct.save();
    res.redirect('/products');
});

// Xóa sản phẩm
router.post('/delete/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});

module.exports = router;
