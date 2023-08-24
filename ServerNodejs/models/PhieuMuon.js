const mongoose = require("mongoose");

const PhieuMuonSchema = new mongoose.Schema({
    maThanhVien:{
        type: mongoose.Schema.Types.ObjectId, ref: 'thanhvien'
    },
    maThuThu:{
        type: mongoose.Schema.Types.ObjectId, ref: 'nguoidung'
    },
    maSach:{
        type: mongoose.Schema.Types.ObjectId, ref: 'sach'
    },
    ngayMuon:{
        type:String
    },
    tienThue:{
        type: mongoose.Schema.Types.ObjectId, ref: 'sach'
        // type:String
    },
    traSach:{
        type:String
    }
});

module.exports = mongoose.model("phieumuon",PhieuMuonSchema);