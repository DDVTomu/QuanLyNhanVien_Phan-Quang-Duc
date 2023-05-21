var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  //Lấy thông tin từ user
  var _taiKhoan = getEle("tknv").value;
  var _tenNV = getEle("name").value;
  var _email = getEle("email").value;
  var _matKhau = getEle("password").value;
  var _ngayLam = getEle("datepicker").value;
  var _luongCB = getEle("luongCB").value;
  var _chucVu = getEle("chucvu").value;
  var _gioLam = getEle("gioLam").value;

  var isValid = true;

  //Validation _taiKhoan
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(
        _taiKhoan,
        "tbTKNV",
        "(*) Vui long nhap Ten Tai Khoan"
      ) &&
      validation.kiemTraPattern(
        _taiKhoan,
        /\d{4,6}/,
        "tbTKNV",
        "(*) Vui long Ten TK voi 4 -> 6 ki so"
      );
  }
  //Validation TenNV
  isValid &=
    validation.kiemTraRong(_tenNV, "tbTen", "(*) Vui long nhap TenNV") &&
    validation.kiemTraChuoiKiTu(
      _tenNV,
      "tbTen",
      "(*) Vui long nhap chuoi ki tu"
    );

  //Validation Email
  isValid &=
    validation.kiemTraRong(_email, "tbEmail", "(*) Vui long nhap Email") &&
    validation.kiemTraPattern(
      _email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "tbEmail",
      "(*) Vui long nhap Email hop le!"
    );

  //Validation MatKhau
  isValid &=
    validation.kiemTraRong(
      _matKhau,
      "tbMatKhau",
      "(*) Vui long nhap MatKhau"
    ) &&
    validation.kiemTraPattern(
      _matKhau,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
      "tbMatKhau",
      "(*) Vui long nhap MatKhau hop le!"
    );

  //Validation NgaySinh
  isValid &=
    validation.kiemTraRong(_ngayLam, "tbNgay", "(*) Vui long nhap NgayLam") &&
    validation.kiemTraPattern(
      _ngayLam,
      /([0][1-9]|[1][0-2])(\/)([1-2][0-9]|[0][1-9]|[3][0-1])(\/)[1-9][0-9][0-9]{2}/,
      "tbNgay",
      "(*) Vui long nhap Ngay thang theo trinh tu mm/dd/yyyy"
    );

  //Validation KhoaHoc
  isValid &=
    validation.kiemTraRong(
      _luongCB,
      "tbLuongCB",
      "(*) Vui long nhap luong co ban"
    ) &&
    validation.kiemTraDoDaiSo(
      _luongCB,
      "tbLuongCB",
      "(*) Vui long nhap so tien tu 1.000.000 - 20.000.000",
      1000000,
      20000000
    );

  //Validation KhoaHoc
  isValid &= validation.kiemTraChucVu(
    "chucvu",
    "tbChucVu",
    "(*) Vui long chon Chuc Vu"
  );

  validation.kiemTraRong(_gioLam, "tbGiolam", "(*) Vui long nhap gio lam") &&
    validation.kiemTraDoDaiSo(
      _gioLam,
      "tbGiolam",
      "(*) Vui long nhap so gio tu 80 - 200",
      80,
      200
    );

  if (!isValid) return null;

  //   if (_taiKhoan)
  //Tạo đối sv từ lớp đối tượng SinhVien
  var nv = new NhanVien(
    _taiKhoan,
    _tenNV,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam
  );

  //Tinh tongLuong
  nv.tinhTongLuong();
  nv.xepLoai();

  return nv;
}

document.getElementById("btnThemNV").onclick = function (event) {
  event.preventDefault();
  var nv = layThongTinNV();
  dsnv.themNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
};

document.getElementById("btnCapNhat").onclick = function () {
  var nv = layThongTinNV();
  dsnv.capNhatNV(nv);
  renderTable(dsnv.arr);
  setLocalStorage();
};

function deleteNV(taiKhoan) {
  dsnv.xoaNV(taiKhoan);
  renderTable(dsnv.arr);
  setLocalStorage();
}

function renderTable(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    var nv = data[i];
    content += `
          <tr>
              <td>${nv.taiKhoan}</td>
              <td>${nv.tenNV}</td>
              <td>${nv.email}</td>
              <td>${nv.ngayLam}</td>
              <td>${nv.chucVu}</td>
              <td>${nv.tongLuong}</td>
              <td>${nv.xepLoai}</td>
              <td>
                  <button class="btn btn-danger" onclick="deleteNV('${nv.taiKhoan}')">Delete</button>
              </td>
          </tr>
      `;
  }
  getEle("tableDanhSach").innerHTML = content;
}

function setLocalStorage() {
  //convert Json => String
  var dataString = JSON.stringify(dsnv.arr);
  //set localStorage
  localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
  //check condition
  if (localStorage.getItem("DSNV")) {
    var dataString = localStorage.getItem("DSNV");
    //convert String => Json
    dsnv.arr = JSON.parse(dataString);
    //render table
    renderTable(dsnv.arr);
  }
}

getEle("searchName").addEventListener("keyup", function () {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv.timKiemNV(keyword);
  renderTable(mangTimKiem);
});
