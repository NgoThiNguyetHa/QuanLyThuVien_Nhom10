const mongoose = require('mongoose');

const LoaiSachSchema = mongoose.Schema({
    // maLoaiSach:{type: String},
    tenLoaiSach:{type: String},
    image: {type: String}
});
module.exports = mongoose.model('loaisach', LoaiSachSchema);