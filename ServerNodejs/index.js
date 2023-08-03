//demo
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

require('./models/ThanhVien')
require('./models/NguoiDung')
const ThanhVien = mongoose.model("thanhvien")
const NguoiDung = mongoose.model("nguoidung")


const port = 3000;
const hostname = '192.168.1.135';
app.use(bodyParser.json())

const mongoURL= 'mongodb+srv://hoanglong180903:admin@atlascluster.311pkoc.mongodb.net/poly'
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
    const data = await NguoiDung.findByIdAndUpdate(req.params.id , req.body.password , {new : true})
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
// app.listen(3000, "192.168.1.135"); // e.g. app.listen(3000, "192.183.190.3");
app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`)
});