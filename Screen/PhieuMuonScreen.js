import React from 'react'
import { useEffect, useState } from "react";
import {
  StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, Modal, Button,
  Alert
} from 'react-native';
import Checkbox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';

// import RNPickerSelect from 'react-native-picker-select';


export default function PhieuMuonScreen() {
  // this.state = {
  //   currentDate: new Date()
  // };
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('DD-MM-YYYY');
  // ngayMuon = this.state.currentDate.toDateString()
  const [_id, setId] = useState();
  const [tienThue, setTienThue] = useState();
  const [ngayMuon, setNgayMuon] = useState("");
  const [traSach, setTraSach] = useState("");
  const [isBookReturned, setIsBookReturned] = useState(false);

  // maThanhVien
  const [thanhVien, setThanhVien] = useState([]);
  // const [selectedTV, setSelectedTV] = useState(null);
  const [selectedTV, setSelectedTV] = useState(); // Giá trị mặc định là 0 (vị trí đầu tiên)


  // maThuThu
  const [thuThu, setThuThu] = useState([]);

  const [selectedThuThu, setSelectedThuThu] = useState(null);
  // maSach
  const [sach, setSach] = useState([]);
  const [selectedSach, setSelectedSach] = useState(null);

  const [listPhieuMuon, setListPhieuMuon] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);



  //mới
  const [btnLeft, setBtnLeft] = useState("");
  const [btnRight, setBtnRight] = useState("");
  //searchview flatlist
  //mới
  const hostname = "192.168.1.4";
  const [search,setSearch] = useState("");
  const [oldListPM,setOldPM] = useState([]);

  const onSearch = (text) => {
    if(text == ''){
      setListPhieuMuon(oldListPM)
    }else{
    const tempList = listPhieuMuon.filter(item => {
      return item.maThanhVien.name.toLowerCase().indexOf(text.toLowerCase()) > -1 
      || item.maThuThu.hoTen.toLowerCase().indexOf(text.toLowerCase()) > -1 
      || item.maSach.giaThue.toLowerCase().indexOf(text.toLowerCase()) > -1
      || item.maSach.tenSach.toLowerCase().indexOf(text.toLowerCase()) > -1
      || item.ngayMuon.toLowerCase().indexOf(text.toLowerCase()) > -1
      || item.traSach.toLowerCase().indexOf(text.toLowerCase()) > -1
       ;
    });
    setListPhieuMuon(tempList)
  }
  };
  //insert dữ liệu
  const insertPhieuMuon = () => {
    //  getSachById(selectedSach);
    //  console.log(sachById);

    // console.log(sachById.giaThue);
    handleReturnBook();
    const phieuMuon = {
      maThanhVien: selectedTV,
      maThuThu: selectedThuThu,
      maSach: selectedSach,
      ngayMuon: formattedDate,
      tienThue: selectedSach,
      traSach: traSach
    };
    
    if(selectedTV === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên thành viên")
      return;
    }
    if(selectedTV === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên thành viên")
      return;
    }
    if(selectedThuThu === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên thủ thư")
      return;
    }
    if(selectedThuThu === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên thủ thư")
      return;
    }
    if(selectedSach === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên sách")
      return;
    }
    if(selectedSach === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên sách")
      return;
    }
    
    fetch(`http://${hostname}:3000/insertPhieuMuon`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(phieuMuon),
    })
    getListPhieuMuon();
    setModalVisible(!modalVisible)
    Alert.alert("Them thanh cong");
    setNgayMuon("");
    setTienThue("");
    setIsBookReturned(false)
    setSelectedTV("")
    setSelectedSach("")
    setSelectedThuThu("")
    setSelectedTV(null);
    setSelectedThuThu(null);
    setSelectedSach(null);
    console.log(selectedSach);
  };
  //lấy dữ liệu
  const getListPhieuMuon = () => {
    fetch(`http://${hostname}:3000/getPhieuMuon`, {
      method: "GET",
      redirect: 'follow'
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res) {
        setListPhieuMuon(res)
        setOldPM(res)
        setLoading(false);
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //tự đổ dữ liệu
  useEffect(() => {
    getListPhieuMuon()
    getSach()
    getThanhVien()
    getThuThu()
  }, [])

  //delete dữ liệu thanh vien
  const deletePhieuMuon = (_id) => {
    fetch(`http://${hostname}:3000/deletePhieuMuon/${_id}`, {
      method: "DELETE",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res);
        getListPhieuMuon();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get loại sách đổ lên picker
  const getThanhVien = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/getThanhVien`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setThanhVien(response)
          // setLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }
  //get loại sách đổ lên picker
  const getThuThu = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/getNguoiDung`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setThuThu(response)
          // setLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }
  //get loại sách đổ lên picker
  const getSach = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/getSach`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setSach(response)
          // setLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  


  //update api phieuMuon
  const updatePhieuMuon = () => {
    const phieuMuon = {

      maThanhVien: selectedTV,
      maThuThu: selectedThuThu,
      maSach: selectedSach,
      ngayMuon: ngayMuon,
      tienThue: selectedSach,
      traSach: traSach,
    };
    if(selectedTV === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên thành viên")
      return;
    }
    if(selectedTV === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên thành viên")
      return;
    }
    if(selectedThuThu === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên thủ thư")
      return;
    }
    if(selectedThuThu === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên thủ thư")
      return;
    }
    if(selectedSach === ''){
    Alert.alert("Thông báo" , "Yêu cầu chọn tên sách")
      return;
    }
    if(selectedSach === null){
      Alert.alert("Thông báo" , "Yêu cầu chọn tên sách")
      return;
    }
    fetch(`http://${hostname}:3000/updatePhieuMuon/${_id}`, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phieuMuon),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(phieuMuon);
        getListPhieuMuon();
        setModalVisible(!modalVisible)
        setId(0);
        setSelectedTV(null);
        setSelectedThuThu(null);
        setSelectedSach(null);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //lấy vị trí từng item đổ lên textinput để update
  const edit = (id, selectedTV, selectedThuThu, selectedSach, ngayMuon, tienThue, traSach) => {
    console.log(id + " / " + selectedTV + " / " + selectedThuThu + " / " + selectedSach + " / " + ngayMuon + " / " + tienThue + " / " + traSach);
    setModalVisible(!modalVisible)
    setId(id)
    setSelectedTV(selectedTV._id)
    setSelectedThuThu(selectedThuThu._id)
    setSelectedSach(selectedSach._id)
    setNgayMuon(ngayMuon)
    setTienThue(tienThue)
    if (traSach == 'Yes') {
      setIsBookReturned(true);
    } else {
      setIsBookReturned(false);
    }
  }

  const handleReturnBook = () => {
    // Gọi các hàm xử lý trả sách tại đây
    // Ví dụ: Gửi yêu cầu trả sách đến máy chủ, cập nhật trạng thái trong cơ sở dữ liệu, v.v.
    // Sau khi xử lý thành công, cập nhật trạng thái isBookReturned thành true
    if (!isBookReturned) {
      setTraSach('Yes')
    } else {
      setTraSach('No');
    }
    console.log(traSach)
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.sectionStyle}>
        {/* search view*/}
        <Image
          source={require("../assets/searchview.png")}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <TextInput
          style={{ flex: 1, borderColor: "#fff", padding: 3 }}
          placeholder="Search..."
          underlineColorAndroid="transparent"
          mode="outlined"
          value={search}
          onChangeText={text => {
            onSearch(text);
            setSearch(text);
          }}
        />
        {search == '' ? null :(
        <TouchableOpacity
        style={{marginRight:15}}
        onPress={() => {
          
          setSearch("");
        }}
        >
          <Text>X</Text>
        </TouchableOpacity>
      )}
      </View>
      {/* flat list - danh sách thành viên*/}
      <FlatList
        style={{ flex: 0.9, width: "85%", }}
        data={listPhieuMuon}
        keyExtractor={(item, index) => item._id}
        onRefresh={() => getListPhieuMuon()}
        refreshing={loading}
        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true),
              setBtnLeft("Update"),
              setBtnRight("Delete"),
              edit(item._id, item.maThanhVien, item.maThuThu, item.maSach, item.ngayMuon, item.tienThue, item.traSach)
            }}>


            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                margin: 10,
                padding: 5,
                flexDirection: "row",
                borderColor: "white",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#FAFAFA",
                elevation: 5,
              }}
            >
              <View style={{ flexDirection: 'row', flex:5, alignItems:'center', justifyContent:'center' }}>
                <Image
                  style={{borderRadius:60, width:100, height:100, marginLeft:5, marginRight:5}}
                  source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }}
                />
                <View style={{ margin: 5, flexDirection: 'column', flex:3 }}>


                  <Text>Thành viên: {item.maThanhVien.name}</Text>
                  <Text>Thủ thư: {item.maThuThu.hoTen}</Text>
                  <Text>Sách: {item.maSach.tenSach}</Text>
                  <Text>Ngày mượn: {item.ngayMuon}</Text>
                  <Text>Giá thuê: {item.tienThue.giaThue}</Text>
                  <Text
                    style={item.traSach == 'Yes' ? styles.chuaTraSach : styles.daTraSach}
                  >{item.traSach == 'Yes' ? 'Đã trả sách' : 'Chưa trả sách'}</Text>


                </View>
              </View>
            </View>

          </TouchableOpacity>
        )}
      />
      {/* dialog insert - update  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={require("../assets/img_dialogPhieuMuon.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
            <Text style={{color:'gray'}}>Thành viên</Text>
            {/* select thành viên */}
            <Picker
              selectedValue={selectedTV}
              onValueChange={(itemValue) => setSelectedTV(itemValue)}

            >
              {thanhVien.map(user => (
                <Picker.Item

                  key={user._id}
                  label={user.name}
                  value={user._id}
                // onPress={() =>{
                //   if(selectTV ==null){
                //     setSelectTV(user[0].hoTen)
                //     console.log("thanh vien"+user[0]._id)
                //   }

                // }}
                />
              ))}
            
            </Picker>
            {/* select thủ thư */}
            <Text style={{color:'gray'}}>Thủ thư</Text>
            <Picker
              selectedValue={selectedThuThu}
              onValueChange={(itemValue) => setSelectedThuThu(itemValue)}
            >
              {thuThu.map(user => (
                <Picker.Item
                  key={user._id}
                  label={user.hoTen}
                  value={user._id}
                />
              ))}
            </Picker>
            {/* select sách */}
            <Text style={{color:'gray'}}>Sách</Text>
            <Picker
              selectedValue={selectedSach}
              onValueChange={(itemValue) => setSelectedSach(itemValue)}
            >
              {sach.map(user => (
                <Picker.Item
                  key={user._id}
                  label={user.tenSach}
                  value={user._id}
                />
              ))}
            </Picker>
            {/* input name*/}
            <Text style={{color:'gray'}}>Ngày mượn</Text>
            <Text
              style={styles.inputStyle}
              value={formattedDate}
            >{formattedDate}</Text>
           

            <View style={{ flex: 1 }}>
              {/* <Checkbox
                value={isBookReturned}
                onValueChange={setIsBookReturned}
              /> */}
              <CheckBox
                
                title='Trả sách'
                checked={isBookReturned}
                onPress={() => {
                  setIsBookReturned(!isBookReturned)
                  handleReturnBook()
                }} />
              {/* <Text>{isBookReturned ? 'Yes' : 'No'}</Text> */}
              {/* <Button title="Submit" onPress={handleReturnBook} disabled={isBookReturned} /> */}
            </View>
            {/* view button  */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                title={btnLeft}
                visible="false"
                onPress={() => {
                  // _id, selectedLoai, tenSach, giaThue
                  if (_id && thanhVien && thuThu && sach && ngayMuon && tienThue && traSach) { // nếu _id , name , namSinh == true trùng với dữ liệu th

                    updatePhieuMuon();
                  } else {
                    insertPhieuMuon();
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#009ACD"
              />
              <Button
                title={btnRight}
                onPress={() => {

                  // setTenSach("");
                  // setGiaThue("")
                  // setTacGia("")
                  // setNamXuatBan("")
                  // setImage([])
                  if (_id) {
                    Alert.alert(
                      //title
                      'Thông Báo!',
                      //body
                      'Bạn có chắc chắn muốn xóa không?',
                      [
                        {
                          text: 'Có',
                          onPress: () => {
                            // handleRemove(item._id)
                            deletePhieuMuon(_id)
                          }
                        },
                        {
                          text: 'Không',
                          onPress: () => {
                            setModalVisible(!modalVisible)
                            setId(0);
                            //  setName("");
                            //   setNamSinh("")
                            //   //them moi
                            //   setMail("");
                            //   setCccd("")
                            //   setSdt("")
                            //   setDiaChi("")
                            //   setPicture("")
                            //   setImage([])
                            setBtnLeft("")
                            setBtnRight("")
                          }, style: 'cancel'
                        },
                      ],
                      { cancelable: false },
                    );
                    setModalVisible(false)

                  } else {
                    setModalVisible(!modalVisible)
                    setId(0);
                    // setName("");
                    // setNamSinh("")
                    // //them moi
                    // setMail("");
                    // setCccd("")
                    // setSdt("")
                    // setDiaChi("")
                    // setPicture("")
                    // setImage([])
                    setBtnLeft("")
                    setBtnRight("")
                  }
                }}
                color="#009ACD"
                style={[styles.button, styles.buttonClose]}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* btn open dialog  */}
      <View style={{ width: "100%", alignItems: "flex-end" }}>

        <TouchableOpacity
          style={{
            borderColor: "white",
            margin: 10,
            borderRadius: 5,
            elevation: 100,
            backgroundColor: "#009ACD",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: 'hidden',
            padding: 10
          }}
          onPress={() => { setModalVisible(true), setBtnLeft("Save"), setBtnRight("Cancel") }}
        >
          <Image
            style={{ width: 25, height: 25, padding: 15 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png",
            }}
          />
        </TouchableOpacity>
      </View>



    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // search view
  inputContainer: {
    justifyContent: "center",
  },
  //search view
  sectionStyle: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
    borderRadius: 5,
    elevation: 10,
  },
  // style dialog
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: 550,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#525EAA',
  },
  buttonClose: {
    backgroundColor: "#525EAA",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputStyle: {
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },


  //set style trả sách
  daTraSach: {
    color: "red",
  },
  chuaTraSach: {
    color: "blue"
  },
});