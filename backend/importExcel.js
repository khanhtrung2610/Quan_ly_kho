const mongoose = require("mongoose");
const xlsx = require("xlsx");

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/warehouse", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định nghĩa Schema cho sản phẩm
const productSchema = new mongoose.Schema({
    id: Number,
    tenThietBi: String,
    loaiThietBi: String,
    gia: Number,
    soLuong: Number,
    moTa: String,
    ngayNhapKho: String,
    nhaCungCap: String
});

const Product = mongoose.model("Product", productSchema);

// Đọc file Excel
const workbook = xlsx.readFile("khohang.xlsx");  // Đổi thành tên file Excel của bạn
const sheetName = workbook.SheetNames[0];
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Chuyển đổi dữ liệu
const formattedData = data.map(item => ({
    id: item["ID"],
    tenThietBi: item["Tên Thiết Bị"],
    loaiThietBi: item["Loại Thiết Bị"],
    gia: Number(item["Giá (VND)"].toString().replace(/,/g, "")),  // Chuyển về số
    soLuong: item["Số Lượng"],
    moTa: item["Mô Tả"],
    ngayNhapKho: item["Ngày Nhập Kho"],
    nhaCungCap: item["Nhà Cung Cấp"]
}));

// Nhập dữ liệu vào MongoDB
Product.insertMany(formattedData)
    .then(() => {
        console.log("✅ Dữ liệu đã nhập vào MongoDB!");
        mongoose.connection.close();
    })
    .catch(err => console.error("❌ Lỗi khi nhập dữ liệu:", err));
