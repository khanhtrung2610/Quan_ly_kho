const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// Định nghĩa file lưu trữ dữ liệu
const productsFile = path.join(__dirname, 'data', 'products.json');

// Đọc dữ liệu sản phẩm từ file JSON
function getProducts() {
    const data = fs.readFileSync(productsFile);
    return JSON.parse(data);
}

// Lưu dữ liệu sản phẩm vào file JSON
function saveProducts(products) {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
}

// API để lấy tất cả sản phẩm
app.get('/api/products', (req, res) => {
    const products = getProducts();
    res.json(products);
});

// API để thêm sản phẩm
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json(newProduct);
});

// API để sửa sản phẩm
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const products = getProducts();
    
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        saveProducts(products);
        res.json(products[productIndex]);
    } else {
        res.status(404).send('Product not found');
    }
});

// API để xóa sản phẩm
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const products = getProducts();
    
    const productIndex = products.findIndex(p => p.id === parseInt(id));
    if (productIndex !== -1) {
        products.splice(productIndex, 1);
        saveProducts(products);
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
