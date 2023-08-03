const mongoose = require("mongoose");

const ThanhVienSchema = new mongoose.Schema({
    name:{
        type:String
    },
    namSinh:{
        type:String
    }
});

module.exports = mongoose.model("thanhvien",ThanhVienSchema);