import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View , Button, Alert, Modal,  } from "react-native";
import {  TextInput, TouchableOpacity } from "react-native-web";
export default function ThanhVien() {
  const [id,setId] = useState(0);
  const [name,setName] = useState("nhập tên");
  const [namSinh,setNamSinh] = useState("nhập năm sinh");
  const [listThanhVien,setListThanhVien] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [visisbleDelete , setVisibleDelete] = useState(false);
  const getListThanhVien = () => {
    fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/thanhvien", {
      method:"GET"
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res){
      setListThanhVien(res)
    }
  }).catch(err => {
    console.log(err)
  })
  }
  //get list thành viên
  
  // const handleSubmit = async (err) => {
  //   err.preventDefault();
  //   const allInputValue = {
  //     name:name,
  //     namSinh:namSinh,
  //   };
  //   let res = await fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/thanhvien", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(allInputValue),
  //   });
  //   setModalVisible(!modalVisible)
  //   getListThanhVien();
  //   console.log(allInputValue);
  // };
  
  useEffect(() => {
    getListThanhVien()
  })
  const handleSubmit = (name , namSinh) => {
    // err.preventDefault();
    const allInputValue = {
      name:name,
      namSinh:namSinh,
    };
    fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/thanhvien", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(allInputValue),
    });
    getListThanhVien();
    setModalVisible(!modalVisible)
    setName("nhập tên");
    setNamSinh("nhập năm sinh")
    console.log(allInputValue);
  };
  //delete api thanh vien
  const handleRemove = (user_id) => {
     fetch(`https://64b89a9421b9aa6eb079f300.mockapi.io/thanhvien/${user_id}`, {
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
  const handleUpdate = (id , name , namSinh) => {
    const allInputValue = {
      name:name,
      namSinh:namSinh,
    };
     fetch(`https://64b89a9421b9aa6eb079f300.mockapi.io/thanhvien/${id}`, {
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
         setName("nhập tên");
         setNamSinh("nhập năm sinh")
       })
       .catch((err) => {
         console.log(err);
       });
  }

  const edit = (id , name , namSinh) => {
    setModalVisible(!modalVisible)
    setId(id)
    setName(name)
    setNamSinh(namSinh)
  }
  
  //post data lên server
  // const handleSubmit = () => {
  //   fetch('http://localhost:3000/api/addThanhVien', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ name, namSinh }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
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
      {/* flat list  */}
      <FlatList
        style={{ flex: 0.9, width: "50%" }}
        data={listThanhVien}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              borderWidth: 0.5,
              borderRadius: 10,
              margin: 5,
              shadowColor: "gray",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 5,
              shadowOpacity: 1.0,
              flexDirection: "row",
              borderColor: "white",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "column", margin: 5 }}>
              <Text>
                <span>Tên thành viên: </span>
                {item.name}
              </Text>
              <Text>Năm sinh: {item.namSinh}</Text>
            </View>

            <View style={{ flexDirection: "column", padding: 5 }}>
              {/* image delete  */}
              <TouchableOpacity
                onPress={() => {
                  // handleRemove(item.id);
                  alert("Alert Title", "My Alert Msg", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel",
                    },
                    { text: "OK", onPress: () => {handleRemove(item.id)} },
                  ]);
                }}
              >
                <Image
                  source={require("../assets/download-removebg-preview (1).png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
              {/* image update  */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true), edit(item.id, item.name, item.namSinh);
                }}
              >
                <Image
                  source={require("../assets/edit-247-removebg-preview.png")}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            {/* dialog delete */}
      
          </View>
        )}
      />
      {/* dialog  insert*/}
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
              source={require("../assets/image 56.png")}
              style={{ width: 50, height: 50 }}
            />

            <TextInput
              label="Name"
              placeholder="nhap ten"
              value={name}
              style={{ borderWidth: 1, padding: 3, margin: 5, width: "100%" }}
              onChangeText={(newText) => setName(newText)}
            />
            <TextInput
              placeholder="nhap nam sinh"
              value={namSinh}
              style={{ borderWidth: 1, padding: 3, margin: 5, width: "100%" }}
              onChangeText={(newText) => setNamSinh(newText)}
            />
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-evenly",
              }}
            >
              {/* <Button title="Save" onPress={handleSubmit} 
              style={[styles.button, styles.buttonClose ,]}
              color="#525EAA"
               /> */}
              <Button
                title="Save"
                onPress={() => {
                  if (id && name && namSinh) {
                    handleUpdate(id, name, namSinh);
                  } else {
                    handleSubmit(name, namSinh);
                    // handleSubmit
                  }
                }}
                style={[styles.button, styles.buttonClose]}
                color="#525EAA"
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(!modalVisible)}
                color="#525EAA"
                style={[styles.button, styles.buttonClose]}
              />
            </View>
          </View>
        </View>
      </Modal>
      
      {/* btn open dialog  */}
      <View style={{ width: "50%", alignItems: "flex-end" }}>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            borderRadius: 50,
            shadowColor: "gray",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            borderColor: "white",
            shadowRadius: 10,
            shadowOpacity: 1,
          }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png",
            }}
          />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  // search view
  inputContainer: {
    justifyContent: "center",
  },
  sectionStyle: {
    width:"50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#fff",
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderColor: "white",
    shadowRadius: 5,
    shadowOpacity: 1.0,
    margin: 10,
    borderRadius: 5,
  },
  // style dialog
   centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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

});
