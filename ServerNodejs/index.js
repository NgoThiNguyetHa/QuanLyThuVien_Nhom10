//demo
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('./models/ThanhVien')
require('./models/NguoiDung')
require('./models/LoaiSach')
require('./models/Sach')
require('./models/PhieuMuon')
// require('./models')
const ThanhVien = mongoose.model("thanhvien")
const NguoiDung = mongoose.model("nguoidung")
const LoaiSach = mongoose.model("loaisach");
const Sach = mongoose.model("sach");
const PhieuMuon = mongoose.model("phieumuon");


const port = 3000;
// const hostname = '192.168.1.6'; //long
const hostname = '192.168.126.1'; //hantnph28876
app.use(bodyParser.json())

const mongoURL= 'mongodb+srv://hoanglong180903:admin@atlascluster.311pkoc.mongodb.net/QuanLyThuVien'
mongoose.connect(mongoURL , {
  useNewUrlParser : true ,
  useUnifiedTopology: true,
})

mongoose.connection.on("conntected", () => {
  console.log("Connect success")
})
mongoose.connection.on("err" , (err) => {
  console.log("error" , err)
})



//----------------server thành viên---------------//
app.delete("/deleteThanhVien/:id",async (req,res) => {
  // ThanhVien.findByIdAndDelete(req.body.id).
  // then(data => {
  //   console.log(data)
  //   res.send(data)
  // }).catch(err => {
  //   console.log("error" , err)
  // })
  try{
    const data = await ThanhVien.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({
        message:"delete failed"
      })
    }
    return res.status(200).json({
        message:"delete successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})


app.put("/updateThanhVien/:id", async (req, res ) => {
  // ThanhVien.findByIdAndUpdate(req.body.id , {
  //   name: req.body.name,
  //   namSinh:req.body.namSinh,
  // }).then(data => {
  //   console.log(data)
  //   res.send(data)
  // }).catch(err => {
  //   console.log("error" , err)
  // })
  try{
    const data = await ThanhVien.findByIdAndUpdate(req.params.id , req.body , {new : true})
    if(!data){
      return res.status(404).json({
        message:"update failed"
      })
    }
    return res.status(200).json({
        message:"update successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})
app.post('/insertThanhVien' , (req,res) => {
  const thanhvien = new ThanhVien({
    name: req.body.name,
    namSinh:req.body.namSinh,
    mail: req.body.mail,
    cccd: req.body.cccd,
    sdt: req.body.sdt,
    diaChi: req.body.diaChi,
    image: req.body.image
  })
  thanhvien.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {
    console.log
  })
})
app.get('/getThanhVien',(req,res) => {
  ThanhVien.find({})
  .then(data => {
    console.log(data)
    res.send(data)
  })
})




//----------------server người dùng---------------//
app.delete("/deleteNguoiDung/:id",async (req,res) => {
  // ThanhVien.findByIdAndDelete(req.body.id).
  // then(data => {
  //   console.log(data)
  //   res.send(data)
  // }).catch(err => {
  //   console.log("error" , err)
  // })
  try{
    const data = await NguoiDung.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({
        message:"delete failed"
      })
    }
    return res.status(200).json({
        message:"delete successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
})


app.put("/updateNguoiDung/:id", async (req, res ) => {

  try{
    const data = await NguoiDung.findByIdAndUpdate(req.params.id,req.body , {new : true})
    if(!data){
      return res.status(404).json({
        message:"update failed"
      })
    }
    return res.status(200).json({
        message:"update successfully"
        
      })
  }catch(error){
    return res.status(500).json({
      message: error.message,
    })
  }
  })
app.post('/insertNguoiDung' , (req,res) => {
  const nguoidung = new NguoiDung({
    username: req.body.username,
    hoTen:req.body.hoTen,
    password:req.body.password,
    rePassword: req.body.rePassword
  })
  nguoidung.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {
    console.log
  })
})
app.get('/getNguoiDung',(req,res) => {
  NguoiDung.find({})
  .then(data => {
    console.log(data)
    res.send(data)
  })
})

//----------------server loại sách---------------//
app.post('/insertLoaiSach', (req,res) => {
  const loaiSach = new LoaiSach({
    // maLoaiSach: req.body.maLoaiSach,
    tenLoaiSach: req.body.tenLoaiSach,
    image: req.body.image
  })
  loaiSach.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getLoaiSach', (req,res) => {
  LoaiSach.find({}).then(data => {
    console.log(data)
    res.send(data)
  })
})

app.delete('/deleteLoaiSach/:id', async (req,res) => {
  try{
    const data =  await LoaiSach.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})

app.put('/updateLoaiSach/:id', async (req,res) => {
  try{
    const data = await LoaiSach.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!data){
      return res.status(404).json({message: "update failed"})

    }else{
      return res.status(200).json({message: "update successful"})

    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})

//----------------server sách---------------//
app.post('/insertSach', (req,res) => {
  const sach = new Sach({
    maLoaiSach: req.body.maLoaiSach,
    tenSach: req.body.tenSach,
    tacGia: req.body.tacGia,
    namXuatBan: req.body.namXuatBan,
    giaThue: req.body.giaThue,
    image: req.body.image
  })
  sach.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getSach', async (req,res) => {
  // Sach.find({}).populate('loaisach').then(data => {
  //   console.log(data)
  //   res.send(data)
  // })
  try {
    const books = await Sach.find().populate('maLoaiSach'); // maLoaiSach là thuộc tính của Sách
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete('/deleteSach/:id', async (req,res) => {
  try{
    const data =  await Sach.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})

app.put('/updateSach/:id', async (req,res) => {
  try{
    const data = await Sach.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!data){
      return res.status(404).json({message: "update failed"})

    }else{
      return res.status(200).json({message: "update successful"})

    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})


//----------------server phiếu mượn---------------//
app.post('/insertPhieuMuon', (req,res) => {
  const phieuMuon = new PhieuMuon({
    maThanhVien: req.body.maThanhVien,
    maThuThu: req.body.maThuThu,
    maSach: req.body.maSach,
    ngayMuon: req.body.ngayMuon,
    tienThue: req.body.tienThue,
    traSach: req.body.traSach
  })
  phieuMuon.save()
  .then(data => {
    console.log(data)
    res.send(data)
  }).catch(err => {console.log(err)})
})

app.get('/getPhieuMuon', async (req,res) => {
  // Sach.find({}).populate('loaisach').then(data => {
  //   console.log(data)
  //   res.send(data)
  // })
  try {
    const phieuMuon = await PhieuMuon.find()
                  .populate('maThanhVien')   // maThanhVien là thuộc tính của PhieuMuon
                  .populate('maThuThu')   // maThuThu là thuộc tính của PhieuMuon
                  .populate('maSach')   // maSach là thuộc tính của PhieuMuon
                  .populate('tienThue');   // tienThue là thuộc tính của PhieuMuon; 
    res.json(phieuMuon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.delete('/deletePhieuMuon/:id', async (req,res) => {
  try{
    const data =  await PhieuMuon.findByIdAndDelete(req.params.id)
    if(!data){
      return res.status(404).json({message: "delete failed"})
    }else{
      return res.status(200).json({message: "delete successful"})
    }
  }catch(err){
    return res.status(500).json({message: err.message})

  }
})

app.put('/updatePhieuMuon/:id', async (req,res) => {
  try{
    const data = await PhieuMuon.findByIdAndUpdate(req.params.id, req.body, {new: true})
    if(!data){
      return res.status(404).json({message: "update failed"})

    }else{
      return res.status(200).json({message: "update successful"})

    }
  }catch(err){
    return res.status(500).json({message: err.message})
  }
})

//----------------server thống kê---------------//
//lấy danh sách theo khoảng ngày
app.get('/doanhThu', async (req, res) => {
  try {
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;

      const revenueData = await PhieuMuon.find({
        ngayMuon: { $gte: startDate, $lte: endDate }
      }).populate('maThanhVien')   // maThanhVien là thuộc tính của PhieuMuon
      .populate('maThuThu')   // maThuThu là thuộc tính của PhieuMuon
      .populate('maSach')   // maSach là thuộc tính của PhieuMuon
      .populate('tienThue');   // tienThue là thuộc tính của PhieuMuon; ;
      
      // Tính tổng doanh thu
  const totalRevenue = revenueData.reduce((tongDoanhThu, phieuMuon) => tongDoanhThu + phieuMuon.maSach.giaThue, 0);

  // res.json({ books: revenueData, totalRevenue });
      res.json(revenueData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// thống kê
app.get('/top-10-books', async (req, res) => {
  try {
    const result = await PhieuMuon.aggregate([
      {
        $group: {
          _id: '$maSach',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'saches', // Tên của bảng sách
          localField: '_id',
          foreignField: '_id',//khoa phu tu bang sach
          as: 'sachInfo'
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          tenSach: { $arrayElemAt: ['$sachInfo.tenSach', 0] }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).then(results => {
    results.forEach(result => {
      idSachToCountMap[result._id] = result.totalBorrowCount;
    });
    console.log(idSachToCountMap);
  });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }


});


app.get('/top10', async (req, res) => {

  try {
    const topSach = await PhieuMuon.aggregate([
      {
        $group: {
          _id: "$maSach",
          totalLuotMuon: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'saches', // Tên của bảng sách
          localField: '_id',
          foreignField: '_id',//khoa phu tu bang sach
          as: 'sachInfo'
        }
      },
      {
        $project: {
          _id: 1,
          totalLuotMuon: 1,
          tenSach: { $arrayElemAt: ['$sachInfo.tenSach', 0] }
        }
      },
      {
        $sort: { totalLuotMuon: -1 }
      },
      {
        $limit: 10
      }
    ]).exec();

    res.json(topSach);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/top10WithMonth/', async (req, res) => {

  try {
    const month = req.query.month;
    const topSach = await PhieuMuon.aggregate([
      {
        $match: {
          ngayMuon: {
            // $regex: `${month}-2023`
            // $regex: `08-2023`
            $regex: month
          }
        }
      },
      {
        $group: {
          _id: "$maSach",
          totalLuotMuon: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'saches', // Tên của bảng sách
          localField: '_id',
          foreignField: '_id',//khoa phu tu bang sach
          as: 'sachInfo'
        }
      },
      {
        $project: {
          _id: 1,
          totalLuotMuon: 1,
          tenSach: { $arrayElemAt: ['$sachInfo.tenSach', 0] }
        }
      },
      {
        $sort: { totalLuotMuon: -1 }
      },
      {
        $limit: 10
      }
    ]).exec();

    res.json(topSach);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/soLuotMuon', async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: null,
          totalMuon: { $sum: 1 },
        },
      },
    ];
    const result = await PhieuMuon.aggregate(pipeline).exec();
    const totalMuon = result.length > 0 ? result[0].totalMuon : 0;

    res.json({ totalMuon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
//chưa bật máy ảo à b 
//cái này chạy kj thé k có app 
// app.listen(3000, "192.168.1.135"); // e.g. app.listen(3000, "192.183.190.3");
app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
});