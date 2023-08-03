import React from 'react'
import { useEffect, useState } from "react";
import { StyleSheet,Text, TextInput, View, Image , TouchableOpacity  , FlatList , Modal , Button,
Alert} from 'react-native';

export default function ThanhVienScreen() {
  const [_id,setId] = useState();
  const [name,setName] = useState("");
  const [namSinh,setNamSinh] = useState("");
  const [listThanhVien,setListThanhVien] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  //insert dữ liệu
  const handleSubmit = (name , namSinh) => {
    const allInputValue = {
      name:name,
      namSinh:namSinh,
    };
    fetch('http://192.168.1.135:3000/insertThanhVien', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(allInputValue),
    })
    getListThanhVien();
    setModalVisible(!modalVisible)
    Alert.alert("Them thanh cong");
    setName("");
    setNamSinh("")
    console.log(allInputValue);
  };
  //lấy dữ liệu
  const getListThanhVien = () => {
    fetch("http://192.168.1.135:3000/getThanhVien", {
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
     fetch(`http://192.168.1.135:3000/deleteThanhVien/${_id}`, {
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
       })
       .catch((err) => {
         console.log(err);
       });
  }

  //update api thanh vien
  const handleUpdate = (_id , name , namSinh) => {
    const allInputValue = {
      name:name,
      namSinh:namSinh,
    };
     fetch(`http://192.168.1.135:3000/updateThanhVien/${_id}`, {
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
       })
       .catch((err) => {
         console.log(err);
       });
  }
  //lấy vị trí từng item đổ lên textinput để update
  const edit = (id , name , namSinh) => {
    console.log(id);
    setModalVisible(!modalVisible)
    setId(id)
    setName(name)
    setNamSinh(namSinh)
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
        style={{ flex: 0.9, width: "80%" ,  }}
        data={listThanhVien}
        keyExtractor={(item, index) => item._id}
        onRefresh={() => getListThanhVien()}
        refreshing={loading}
        renderItem={({ item }) => (
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
              elevation: 5,
            }}
          >
            <View style={{ flexDirection: "column", margin: 5 }}>
            
              <Text>Tên thành viên: {item.name}</Text>
              <Text>Năm sinh: {item.namSinh}</Text>
            </View>
            {/* dialog delete */}
            <View style={{ flexDirection: "row", padding: 5 }}>
              {/* image delete  */}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    //title
                    'Thông Báo!',
                    //body
                    'Bạn có chắc chắn muốn xóa không?',
                    [
                      {
                        text: 'Có',
                        onPress: () => {
                          handleRemove(item._id)
                        }
                      },
                      {
                        text: 'Không',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                      },
                    ],
                    {cancelable: false},
                  );
                }}
              >
                <Image
                  source={require("../assets/download-removebg-preview(1).png")}
                  style={{ width: 20  , height: 23 , margin:5 }}
                />
              </TouchableOpacity>
              {/* image update  */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true),
                   edit(item._id, item.name, item.namSinh);
                }}
              >
                <Image
                  source={require("../assets/edit-247-removebg-preview.png")}
                  style={{ width: 25, height: 25 , margin:5 }}
                />
              </TouchableOpacity>
            </View>

          </View>
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
              source={require("../assets/icondialoginsert.png")}
              style={{ width: 100, height: 100 , alignSelf:"center" }}
            />
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
          {/* view button  */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                title="Save"
                visible="false"
                onPress={() => {
                  if (_id && name && namSinh) { // nếu _id , name , namSinh == true trùng với dữ liệu th
                    handleUpdate(_id, name, namSinh);
                  } else {
                    handleSubmit(name, namSinh);
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
                  setName("");
                  setNamSinh("")
                }}
                color="#525EAA"
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
            backgroundColor:"#525EAA",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            overflow: 'hidden',
            padding:10
          }}
          onPress={() => setModalVisible(true)}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // search view
  inputContainer: {
    justifyContent: "center",
  },
  //search view
  sectionStyle: {
    width:"80%",
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