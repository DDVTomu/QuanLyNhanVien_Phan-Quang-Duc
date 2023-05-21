function NhanVien(
  _taiKhoan,
  _tenNV,
  _email,
  _matKhau,
  _ngayLam,
  _luongCB,
  _chucVu,
  _gioLam
) {
  this.taiKhoan = _taiKhoan;
  this.tenNV = _tenNV;
  this.email = _email;
  this.matKhau = _matKhau;
  this.ngayLam = _ngayLam;
  this.luongCB = _luongCB;
  this.chucVu = _chucVu;
  this.gioLam = _gioLam;
  this.xepLoai = "";
  this.tongLuong = 0;

  this.xepLoai = function () {
    if (Number(this.gioLam) >= 192) {
      this.xepLoai = "Xuất sắc";
    } else if (Number(this.gioLam) >= 176 && Number(this.gioLam) < 192) {
      this.xepLoai = "Giỏi";
    } else if (Number(this.gioLam) >= 160 && Number(this.gioLam) < 176) {
      this.xepLoai = "Khá";
    } else if (Number(this.gioLam) < 160) {
      this.xepLoai = "Trung bình";
    }
  };

  this.tinhTongLuong = function () {
    switch (this.chucVu) {
      case "Sếp":
        this.tongLuong = Number(this.luongCB) * 3;
        break;
      case "Trưởng phòng":
        this.tongLuong = Number(this.luongCB) * 2;
        break;
      case "Nhân viên":
        this.tongLuong = Number(this.luongCB) * 1;
        break;
    }
  };
}
