import pandas as pd

class QuanLyKho:
    def __init__(self, file_excel=r"D:\Projects\warehouse-management\backend\khohang.xlsx"):
        self.file_excel = file_excel
        try:
            # Đọc dữ liệu từ file Excel nếu có
            self.df = pd.read_excel(self.file_excel)
        except FileNotFoundError:
            # Nếu file không tồn tại, tạo DataFrame mới và lưu vào file
            self.df = pd.DataFrame(columns=["Tên thiết bị", "Số lượng", "Giá tiền"])
            self.df.to_excel(self.file_excel, index=False)

    def hien_thi_ds(self):
        print(self.df)

    def tim_kiem(self, ten_thiet_bi):
        ket_qua = self.df[self.df["Tên thiết bị"] == ten_thiet_bi]
        if not ket_qua.empty:
            print(ket_qua)
        else:
            print("Không tìm thấy thiết bị!")

    def them_thiet_bi(self, ten, so_luong, gia):
        # Tạo một dictionary chứa thông tin thiết bị mới
        thiet_bi_moi = {
            "Tên thiết bị": [ten],  # Danh sách chứa tên thiết bị
            "Số lượng": [so_luong],  # Danh sách chứa số lượng
            "Giá tiền": [gia]  # Danh sách chứa giá tiền
        }
        # Chuyển dictionary thành DataFrame
        thiet_bi_moi_df = pd.DataFrame(thiet_bi_moi)
        
        # Sử dụng pd.concat để thêm thiết bị vào DataFrame hiện tại
        self.df = pd.concat([self.df, thiet_bi_moi_df], ignore_index=True)
        
        # Lưu DataFrame vào file Excel
        self.df.to_excel(self.file_excel, index=False)
        print("Đã thêm thiết bị mới!")

    def cap_nhat_so_luong(self, ten, so_luong_moi):
        self.df.loc[self.df["Tên thiết bị"] == ten, "Số lượng"] = so_luong_moi
        self.df.to_excel(self.file_excel, index=False)
        print("Đã cập nhật số lượng thiết bị!")

    def xoa_thiet_bi(self, ten):
        self.df = self.df[self.df["Tên thiết bị"] != ten]
        self.df.to_excel(self.file_excel, index=False)
        print("Đã xóa thiết bị!")

# Ví dụ sử dụng
if __name__ == "__main__":
    kho = QuanLyKho()
    kho.hien_thi_ds()
    kho.them_thiet_bi("Router Cisco", 10, 2000000)
    kho.tim_kiem("Router Cisco")
    kho.cap_nhat_so_luong("Router Cisco", 15)
    kho.xoa_thiet_bi("Router Cisco")
