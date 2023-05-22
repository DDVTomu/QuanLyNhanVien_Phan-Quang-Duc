function DSNV() {
  this.arr = [];

  this.timViTri = function (taiKhoan) {
    /**
     * 0. tao bien index = -1;
     * 1. duyet mang
     * 2. sv = arr[i];
     * 3. Neu sv.maSV trùng với maSV
     *      => true => index = i
     *                  break;
     */
    var index = -1;
    for (var i = 0; i < this.arr.length; i++) {
      var nv = this.arr[i];
      if (nv.taiKhoan === taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.themNV = function (nv) {
    this.arr.push(nv);
  };

  this.xoaNV = function (taiKhoan) {
    var index = this.timViTri(taiKhoan);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };

  this.layThongTinNV = function (taiKhoan) {
    var index = this.timViTri(taiKhoan);

    if (index !== -1) {
      return this.arr[index];
    }

    return null;
  };

  this.capNhatNV = function (nv) {
    console.log(nv);
    var index = this.timViTri(nv.taiKhoan);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
}

DSNV.prototype.timKiemNV = function (keyword) {
  var mangTimKiem = [];

  for (var i = 0; i < this.arr.length; i++) {
    var nv = this.arr[i];
    //Chuyển keyword về chữ viết thường
    var keywordToLowerCase = keyword.toLowerCase();
    //Chuyển sv.tenSV về chữ viết thường
    var tenNVToLowerCase = nv.xepLoai.toLowerCase();
    if (tenNVToLowerCase.indexOf(keywordToLowerCase) !== -1) {
      mangTimKiem.push(nv);
    }
  }

  return mangTimKiem;
};
