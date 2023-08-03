const mongoose = require("mongoose");

const NguoiDungSchema = new mongoose.Schema({
    username:{
        type:String
    },
    hoTen:{
        type:String
    },
    password:{
        type:String
    },
    rePassword:{
        type:String 
    }
});

module.exports = mongoose.model("nguoidung",NguoiDungSchema);