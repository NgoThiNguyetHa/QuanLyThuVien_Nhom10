import React from 'react'
import { useEffect, useState } from "react";
import {
  StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, Modal, Button,
  Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';


// import RNPickerSelect from 'react-native-picker-select';


export default function SachScreen() {
  const [_id, setId] = useState();
  const [tenSach, setTenSach] = useState("");
  const [giaThue, setGiaThue] = useState("");
  const [tacGia, setTacGia] = useState("");
  const [namXuatBan, setNamXuatBan] = useState("");
  // const [maLoaiSach, setMaLoaiSach] = useState("");
  const [maLoaiSach, setMaLoaiSach] = useState([]);
  const [selectedLoai, setSelectedLoai] = useState(null);
  //image
  const [picutre, setPicture] = useState("");
  const [image, setImage] = useState([]);


  const [listSach, setListSach] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //mới
  const [btnLeft, setBtnLeft] = useState("");
  const [btnRight, setBtnRight] = useState("");

  //insert dữ liệu
  const insertSach = () => {
    const sach = {
      tenSach: tenSach,
      giaThue: giaThue,
      maLoaiSach: selectedLoai,
      tacGia: tacGia,
      namXuatBan: namXuatBan,
      image: picutre
    };
    fetch('http://192.168.126.1:3000/insertSach', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sach),
    })
    getListSach();
    setModalVisible(!modalVisible)
    Alert.alert("Them thanh cong");
    setGiaThue("");
    setTenSach("");
    setTacGia("");
    setNamXuatBan("");
    setImage([]);
    console.log(sach);
  };
  //lấy dữ liệu
  const getListSach = () => {
    fetch("http://192.168.126.1:3000/getSach", {
      method: "GET",
      redirect: 'follow'
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res) {
        setListSach(res)
        setLoading(false);
        
      }
    }).catch(err => {
      console.log(err)
    })
  }
  //tự đổ dữ liệu
  useEffect(() => {
    getListSach()
    getLoaiSach()
  }, [])

  //delete dữ liệu thanh vien
  const deleteSach = (_id) => {
    fetch(`http://192.168.126.1:3000/deleteSach/${_id}`, {
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
        getListSach();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //get loại sách đổ lên picker
  const getLoaiSach = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://192.168.126.1:3000/getLoaiSach", requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setMaLoaiSach(response)
          // setLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }


  //update api thanh vien
  const updateSach = () => {
    const sach = {
      maLoaiSach: selectedLoai._id,
      tenSach: tenSach,
      giaThue: giaThue,
      maLoaiSach: selectedLoai,
      tacGia: tacGia,
      namXuatBan: namXuatBan,
      image: picutre


    };
    fetch(`http://192.168.126.1:3000/updateSach/${_id}`, {
      method: "PUT",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sach),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        console.log(res);
        getListSach();
        setModalVisible(!modalVisible)
        setId(0);
        setTenSach("");
        setGiaThue("");
        setNamXuatBan("");
        setTacGia("");
        setImage([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //lấy vị trí từng item đổ lên textinput để update
  const edit = (id, selectedLoai, tenSach, tacGia, namXuatBan, giaThue, image) => {
    console.log(id + " " + selectedLoai._id + " " + tenSach + " " + giaThue);
    setModalVisible(!modalVisible)
    setId(id)
    setSelectedLoai(selectedLoai._id)
    setTenSach(tenSach)
    setGiaThue(giaThue)
    setTacGia(tacGia)
    setNamXuatBan(namXuatBan)
    setImage(image)
  }

  //click image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true, // Tắt tùy chọn chỉnh sửa
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: false
    });

    console.log(result.uri);

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri, {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      setPicture(result.assets[0].uri);
    }
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
        />
      </View>
      {/* flat list - danh sách thành viên*/}
      <FlatList
        style={{ flex: 0.9, width: "85%", }}
        data={listSach}
        keyExtractor={(item, index) => item._id}
        onRefresh={() => getListSach()}
        refreshing={loading}
        renderItem={({ item }) => (

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true),
                setBtnLeft("Update"),
                setBtnRight("Delete"),
                edit(item._id, item.maLoaiSach, item.tenSach, item.tacGia, item.namXuatBan, item.giaThue, item.image);
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
              <View style={{ flexDirection: "row", margin: 5, flex: 4 }}>
                <View style={{}}>
                  <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 50 }} />

                </View>
                <View style={{ marginLeft:10}}>
                <Text style={{fontWeight:'bold'}}>{item.tenSach}</Text>
                  <Text>Loại sách: {item.maLoaiSach.tenLoaiSach}</Text>
                  <Text>Tác giả: {item.tacGia}</Text>
                  <Text>Năm xuất bản: {item.namXuatBan}</Text>
                  <Text>Giá thuê: {item.giaThue}</Text>

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
              source={require("../assets/img_dialogSach.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
            <Text style={{color:'gray'}}>Thể loại</Text>
            <Picker
              selectedValue={selectedLoai}
              onValueChange={(itemValue) => setSelectedLoai(itemValue)}
            >
              {maLoaiSach.map(category => (
                <Picker.Item
                  key={category._id}
                  label={category.tenLoaiSach}
                  value={category._id}
                />
              ))}
            </Picker>
            {/* input name*/}
            <TextInput
              style={styles.inputStyle}
              value={tenSach}
              mode="outlined"
              placeholder="Nhập tên sách"
              onChangeText={(text) => setTenSach(text)}
            />
            {/* input năm sinh  */}
            <TextInput
              style={styles.inputStyle}
              value={giaThue}
              mode="outlined"
              placeholder="Nhập giá thuê"
              onChangeText={(text) => setGiaThue(text)}
            />
            <TextInput
              style={styles.inputStyle}
              value={tacGia}
              mode="outlined"
              placeholder="Nhập tên tác giả"
              onChangeText={(text) => setTacGia(text)}
            />
            <TextInput
              style={styles.inputStyle}
              value={namXuatBan}
              mode="outlined"
              placeholder="Nhập năm xuất bản"
              onChangeText={(text) => setNamXuatBan(text)}
            />
            {/* show hinh anh  */}
            {image.length > 0 ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  alignSelf: "center",
                }}
              />
            ) : //không có ảnh 
              null}
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => pickImage()}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={{
                  uri: "https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg",
                }}
              />
              <Text>Upload image</Text>
              <Image />
            </TouchableOpacity>
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
                  if (_id && maLoaiSach && tenSach && giaThue && tacGia && namXuatBan) { // nếu _id , name , namSinh == true trùng với dữ liệu th

                    // updateSach(_id, tenSach, giaThue, maLoaiSach);
                    updateSach();
                  } else {
                    insertSach();
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#009ACD"
              />
              <Button
                title={btnRight}
                onPress={() => {

                  setGiaThue("");
                  setTenSach("");
                  setTacGia("");
                  setNamXuatBan("");
                  setImage([]);
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
                            deleteSach(_id)
                          }
                        },
                        {
                          text: 'Không',
                          onPress: () => {
                            setModalVisible(!modalVisible)
                            setId(0);
                            setGiaThue("");
                            setTenSach("");
                            setTacGia("");
                            setNamXuatBan("");
                            setImage([]);

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
                    setGiaThue("");
                    setTenSach("");
                    setTacGia("");
                    setNamXuatBan("");
                    setImage([]);
                  }
                }}
                color="#009ACD"
                style={[styles.button, styles.buttonClose]}
              />
              {/* <Button
                title="Save"
                visible="false"
                onPress={() => {
                  // _id, selectedLoai, tenSach, giaThue
                  if (_id && maLoaiSach && tenSach && giaThue && tacGia && namXuatBan) { // nếu _id , name , namSinh == true trùng với dữ liệu th

                    // updateSach(_id, tenSach, giaThue, maLoaiSach);
                    updateSach();
                  } else {
                    insertSach();
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#525EAA"
              />
              <Button
                title="Cancel"
                onPress={() => {
                  setModalVisible(!modalVisible)
                  setId(0);
                  setTenSach("");
                  setGiaThue("")
                  setTacGia("")
                  setNamXuatBan("")
                  setImage([])
                }}
                color="#525EAA"
                style={[styles.button, styles.buttonClose]}
              /> */}
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
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
  },
});