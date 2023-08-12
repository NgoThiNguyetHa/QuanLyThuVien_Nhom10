const mongoose = require('mongoose');

// require('./models/LoaiSach')
// const LoaiSach = mongoose.model("loaisach");

const SachSchema = mongoose.Schema({
    maLoaiSach:{type: mongoose.Schema.Types.ObjectId, ref: 'loaisach'},  // const LoaiSach = mongoose.model("loaisach");
    tenSach:{type: String},
    tacGia: {type: String},
    namXuatBan: {type: String},
    giaThue:{type: String},
    image: {type: String}
});
module.exports = mongoose.model('sach', SachSchema);