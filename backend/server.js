const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Nếu dùng biến môi trường trong file .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Kết nối MongoDB (nếu sử dụng)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/warehouse';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Route kiểm tra server hoạt động
app.get('/', (req, res) => {
    res.send('Warehouse Management API is running...');
});

// API mẫu để lấy danh sách sản phẩm trong kho
app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'Router Cisco', quantity: 10 },
        { id: 2, name: 'Switch TP-Link', quantity: 5 }
    ]);
});

// Lắng nghe server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
