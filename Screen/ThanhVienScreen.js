import React from 'react'
import { useEffect, useState } from "react";
import { StyleSheet,Text, TextInput, View, Image , TouchableOpacity  , FlatList , Modal , Button,
Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
export default function ThanhVienScreen() {
  const hostname = '192.168.126.1';
  const [_id,setId] = useState();
  const [name,setName] = useState("");
  const [namSinh,setNamSinh] = useState("");
  //them mới123
  const [mail,setMail] = useState("");
  const [cccd,setCccd] = useState("");
  const [sdt,setSdt] = useState("");
  const [diaChi,setDiaChi] = useState("");
  const [picture , setPicture] = useState("");
  const [image, setImage] = useState([]);
  const [btnLeft , setBtnLeft] = useState("");
  const [btnRight ,setBtnRight] = useState("");
  //cũ
  const [listThanhVien,setListThanhVien] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  
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
      setImage(result.assets[0].uri , {
        uri: result.assets[0].uri,
        type: 'image/jpeg', 
        name: 'image.jpg',
      });
      setPicture(result.assets[0].uri);
    }
  };
  //insert dữ liệu
  const handleSubmit = (name , namSinh , mail , cccd , sdt , diaChi ) => {
    const allInputValue = {
      name:name,
      namSinh:namSinh,
      //mới
      mail:mail,
      cccd : cccd ,
      sdt : sdt ,
      diaChi : diaChi,
      image: picture,
    };
    fetch(`http://${hostname}:3000/insertThanhVien`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(allInputValue),
    })
  
    setModalVisible(!modalVisible)
    getListThanhVien();
    Alert.alert("Them thanh cong");
    setName("");
    setNamSinh("");
    setMail("");
    setCccd("")
    setSdt("")
    setDiaChi("")
    setPicture("")
    setImage([])
    setBtnLeft("")
    setBtnRight("")
    console.log(allInputValue);
  };
  //lấy dữ liệu
  const getListThanhVien = () => {
    fetch(`http://${hostname}:3000/getThanhVien`, {
      method:"GET"
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res){
      setListThanhVien(res)
      setLoading(false);
    }
  }).catch(err => {
    console.log(err)
  })
  }
  //tự đổ dữ liệu
  useEffect(() => {
    getListThanhVien()
  },[])

  //delete dữ liệu thanh vien
  const handleRemove = (_id) => {
     fetch(`http://${hostname}:3000/deleteThanhVien/${_id}`, {
       method: "DELETE",
       headers: {
         'Accept': "application/json",
         "Content-Type": "application/json",
       },
      })
       .then((res) => {
         return res.json()})
       .then((res) => {
         console.log(res);
         getListThanhVien();
         setId(0);
         setName("");
         setNamSinh("")
         setMail("");
         setCccd("")
         setSdt("")
         setDiaChi("")
         setPicture("")
         setImage([])
       })
       .catch((err) => {
         console.log(err);
       });
  }

  //update api thanh vien
  const handleUpdate = (_id , name , namSinh , mail , cccd , sdt, diaChi , picture) => {
    const allInputValue = {
      name:name,
      namSinh:namSinh,
      //mới
      mail:mail,
      cccd : cccd ,
      sdt : sdt ,
      diaChi : diaChi,
      image: picture,
    };
     fetch(`http://${hostname}:3000/updateThanhVien/${_id}`, {
       method: "PUT",
       headers: {
         'Accept': "application/json",
         "Content-Type": "application/json",
       },
       body: JSON.stringify(allInputValue),
     })
       .then((res) => {
         return res.json()})
       .then((res) => {
         console.log(res);
         getListThanhVien();
         setModalVisible(!modalVisible)
         setId(0);
         setName("");
         setNamSinh("")
         setMail("");
         setCccd("")
         setSdt("")
         setDiaChi("")
         setPicture("")
         setImage([])
       })
       .catch((err) => {
         console.log(err);
       });
  }
  //lấy vị trí từng item đổ lên textinput để update
  const edit = (id , name , namSinh , mail , cccd , sdt , diaChi , image) => {
    console.log(id);
    setModalVisible(!modalVisible)
    setId(id)
    setName(name)
    setNamSinh(namSinh)
    setMail(mail)
    setCccd(cccd)
    setSdt(sdt)
    setDiaChi(diaChi)
    setImage(image)
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
        />
      </View>
      {/* flat list - danh sách thành viên*/}
        <FlatList
        style={{ flex: 0.9, width: "90%" ,  }}
        data={listThanhVien}
        keyExtractor={(item, index) => item._id}
        onRefresh={() => getListThanhVien()}
        refreshing={loading}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {setModalVisible(true),
          setBtnLeft("Update") , 
          setBtnRight("Delete") ,
          edit(item._id, item.name, item.namSinh , item.mail , item.cccd , item.sdt , item.diaChi , item.image)
          }}>
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              margin: 10,
              padding:5,
              flexDirection: "row",
              borderColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#FAFAFA",
              elevation: 3,
            }}
          >
            <Image 
            source={{ uri: item.image }}
              style={{ width: 100, height: 100, borderRadius: 50  , alignSelf:"center" , borderColor:"gray" , borderWidth:0.2 , elevation: 10, }}/>
            <View style={{ flexDirection: "column", margin: 5 }}>
              
              <Text>Tên thành viên: {item.name}</Text>
              <Text>Năm sinh: {item.namSinh}</Text>
              <Text>Email: {item.mail}</Text>
              <Text>CCCD: {item.cccd}</Text>
              <Text>Sdt: {item.sdt}</Text>
            </View>
            {/* dialog delete */}
            <View style={{ flexDirection: "row", padding: 5 }}>
              {/* image delete  */}
              
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
            {/* <Image
              source={require("../assets/icondialoginsert.png")}
              style={{ width: 100, height: 100 , alignSelf:"center" }}
            /> */}
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
             {/* input name*/}
            <TextInput
              style={styles.inputStyle}
              value={name}
              mode="outlined"
              placeholder="Nhập tên"
              onChangeText={(text) => setName(text)}
            />
          {/* input năm sinh  */}
            <TextInput
              style={styles.inputStyle}
              value={namSinh}
              mode="outlined"
              placeholder="Nhập năm sinh"
              onChangeText={(text) => setNamSinh(text)}
            />
            {/* input mail */}
            <TextInput
              style={styles.inputStyle}
              value={mail}
              mode="outlined"
              placeholder="Nhập mail"
              onChangeText={(text) => setMail(text)}
            />
            {/* input căn cước công dân  */}
            <TextInput
              style={styles.inputStyle}
              value={cccd}
              mode="outlined"
              placeholder="Nhập căn cước công dân"
              onChangeText={(text) => setCccd(text)}
            />
            {/* input số điện thoại  */}
            <TextInput
              style={styles.inputStyle}
              value={sdt}
              mode="outlined"
              placeholder="Nhập số điện thoại"
              onChangeText={(text) => setSdt(text)}
            />
            {/* input số điện thoại  */}
            <TextInput
              style={styles.inputStyle}
              value={diaChi}
              mode="outlined"
              placeholder="Nhập địa chỉ"
              onChangeText={(text) => setDiaChi(text)}
            />

          {/* chọn ảnh  */}
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
                // title="Save"
                title={btnLeft}

                visible="false"
                onPress={() => {
                  if (_id && name && namSinh && mail && cccd && sdt && diaChi && image) { // nếu _id , name , namSinh == true trùng với dữ liệu th
                    handleUpdate(_id, name, namSinh , mail , cccd , sdt ,diaChi , image );
                  } else {
                    handleSubmit(name, namSinh , mail , cccd , sdt ,diaChi , image);
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#009ACD"
              />
              <Button
                // title="Cancel"
                title={btnRight}

                onPress={() => {
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
                          handleRemove(_id)
                        }
                      },
                      {
                        text: 'Không',
                        onPress: () => {
                          setId(0);
                           setName("");
                            setNamSinh("")
                            //them moi
                            setMail("");
                            setCccd("")
                            setSdt("")
                            setDiaChi("")
                            setPicture("")
                            setImage([])
                            setBtnLeft("")
                            setBtnRight("")
                        }, style: 'cancel'
                      },
                    ],
                    {cancelable: false},
                  );
                    setModalVisible(false)
                    
                  }else{
                  setModalVisible(!modalVisible)
                  setId(0);
                  setName("");
                  setNamSinh("")
                  //them moi
                  setMail("");
                  setCccd("")
                  setSdt("")
                  setDiaChi("")
                  setPicture("")
                  setImage([])
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
            backgroundColor:"#009ACD",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: 'hidden',
            padding:10
          }}
          onPress={() => {setModalVisible(true) , setBtnLeft("Save") , setBtnRight("Cancel")}
          }
        >
          <Image
            style={{ width: 25    , height: 25 , padding:15  }}
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
    width:"85%",
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




