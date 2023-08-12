const mongoose = require("mongoose");

const ThanhVienSchema = new mongoose.Schema({
    name:{
        type:String
    },
    namSinh:{
        type:String
    },
    mail:{
        type:String
    },
    cccd:{
        type:String
    },
    sdt:{
        type:String
    },
    diaChi:{
        type:String
    },
    image:{
        type:String
    },
});

module.exports = mongoose.model("thanhvien",ThanhVienSchema);