import React from 'react'
import { useEffect, useState } from "react";
import {
  StyleSheet, Text, TextInput, View, Image, TouchableOpacity, FlatList, Modal, Button,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function LoaiSachScreen() {
  //long
  const hostname = "192.168.1.4";
  //=====//
  const [_id, setId] = useState();
  const [tenLoaiSach, setTenLoaiSach] = useState();
  const [listLoaiSach, setListLoaiSach] = useState();
  // const [picutre, setPicture] = useState("");
  const [picture, setPicture] = useState("");

  const [image, setImage] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //mới
  const [btnLeft, setBtnLeft] = useState("");
  const [btnRight, setBtnRight] = useState("");

  //search view
  const [search,setSearch] = useState("");
  const [oldListLoaiSach,setOldListLoaiSach] = useState([]);

  const onSearch = (text) => {
    if(text == ''){
      setListLoaiSach(oldListLoaiSach)
    }else{
    const tempList = listLoaiSach.filter(item => {
      return item.tenLoaiSach.toLowerCase().indexOf(text.toLowerCase()) > -1 ; 
    });
    setListLoaiSach(tempList)
  }
  };
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

  const insertLoaiSach = (tenLoaiSach) => {
    const loaiSach = {
      tenLoaiSach: tenLoaiSach,
      image: picture
    }
    if (tenLoaiSach.length == 0) {
    Alert.alert("Thông báo" , "Tên loại sách không được để trống")
      return;
    }
    if (image.length == 0) {
    Alert.alert("Thông báo" , "Yêu cầu chọn ảnh")
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(loaiSach),
    };

    fetch(`http://${hostname}:3000/insertLoaiSach`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    getListLoaiSach();
    setModalVisible(!modalVisible);
    Alert.alert("Thêm thành công");

    setImage([]);

    setTenLoaiSach("");
    console.log(loaiSach);
  }

  const deleteLoaiSach = (_id) => {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/deleteLoaiSach/${_id}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        getListLoaiSach();
      })
      .catch(error => console.log('error', error));
  }

  const updateLoaiSach = (_id, tenLoaiSach, picutre) => {
    const loaiSach = {
      tenLoaiSach: tenLoaiSach,
      image: picutre
    }
    if (tenLoaiSach.length == 0) {
    Alert.alert("Thông báo" , "Tên loại sách không được để trống")
      return;
    }
    if (image.length == 0) {
    Alert.alert("Thông báo" , "Yêu cầu chọn ảnh")
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(loaiSach),
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/updateLoaiSach/${_id}`, requestOptions)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        getListLoaiSach();
        setModalVisible(!modalVisible);
        setId(0);
        setTenLoaiSach("");
        setImage([]);
      })
      .catch(error => console.log('error', error));
  }

  const getListLoaiSach = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`http://${hostname}:3000/getLoaiSach`, requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response) {
          setListLoaiSach(response)
          setOldListLoaiSach(response)
          setLoading(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getListLoaiSach()
    
  }, [])

  const edit = (id, tenLoaiSach, image) => {
    console.log(id);
    setModalVisible(!modalVisible);
    setId(id);
    setTenLoaiSach(tenLoaiSach);
    setImage(image);
  }

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
        style={{ flex: 0.9, width: "85%" }}
        // contentContainerStyle = {{justifyContent:'center', alignItems:"center"}}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-evenly', }}
         
        data={listLoaiSach}
        numColumns={2}
        keyExtractor={(item, index) => item._id}
        onRefresh={() => getListLoaiSach()}
        refreshing={loading}
        renderItem={({ item }) => (

          <TouchableOpacity style={{marginLeft:10, marginRight:10}}
            onPress={() => {
              setModalVisible(true),
                setBtnLeft("Update"),
                setBtnRight("Delete"),
                edit(item._id, item.tenLoaiSach, item.image)
            }}>

            <View
              style={{
                borderWidth: 0.5,
                borderRadius: 10,
                marginHorizontal: 5,
                marginTop: -180,
                // padding: 5,
                flexDirection: "row",
                borderColor: "white",
                alignItems: "center",
                backgroundColor: "#FAFAFA",
                elevation: 5,
                
                

                justifyContent:"center",
                // flex: 1,
                // flexDirection: 'column',
                // margin: 1

              }}
            >
              <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 5, margin:4 }}>
                <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10, margin: 10 }} />
                <Text style={{ textAlign: "center", alignSelf: "center", fontWeight: "bold" }}> {item.tenLoaiSach}</Text>

              </View>
              {/* dialog delete */}


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
              source={require("../assets/img_dialogLoaiSach.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
            {/* input tên loại sách*/}
            <TextInput
              style={styles.inputStyle}
              value={tenLoaiSach}
              mode="outlined"
              placeholder="Tên loại sách"
              onChangeText={(text) => setTenLoaiSach(text)}
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
                  if (_id && tenLoaiSach) { // nếu _id , name , namSinh == true trùng với dữ liệu th
                    updateLoaiSach(_id, tenLoaiSach, picture);
                  } else {
                    insertLoaiSach(tenLoaiSach);
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#009ACD"
              />
              <Button
                title={btnRight}
                onPress={() => {

                  setTenLoaiSach("");
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
                            deleteLoaiSach(_id)
                          }
                        },
                        {
                          text: 'Không',
                          onPress: () => {
                            setModalVisible(!modalVisible)
                            setId(0);
                            setTenLoaiSach("");
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
                    setTenLoaiSach("");
                    setImage([]);
                    setBtnLeft("")
                    setBtnRight("")
                  }
                }}
                color="#009ACD"
                style={[styles.button, styles.buttonClose]}
              />
              {/* <Button
                title="Save"
                visible="false"
                onPress={() => {
                  if (_id && tenLoaiSach) { // nếu _id , name , namSinh == true trùng với dữ liệu th
                    updateLoaiSach(_id, tenLoaiSach, picture);
                  } else {
                    insertLoaiSach();
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
                  setImage([]);
                  setTenLoaiSach("")
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