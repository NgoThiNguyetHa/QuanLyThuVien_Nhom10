import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View , Alert, Modal, } from "react-native";
import { Button, TextInput, TouchableOpacity } from "react-native-web";
// import axios from 'axios';
export default function ThemNguoiDung() {
  const [username, setUsername] = useState("Tên đăng nhập");
  const [fullname, setFullname] = useState("Họ tên");
  const [password, setPassword] = useState("password");
  const [rePassword, setRePassword] = useState("Nhập lại password");
  //set list nguoi dung
  const [idLoading, setIsLoading] = useState(true);
  const [dsnd, setdsnd] = useState([]);
  //set dialog 
  const [modalVisible, setModalVisible] = useState(false);
  
  //get dữ liệu lên flatlist
  useEffect (() => {
    // getListNguoiDung();
    getListND();
  })
  // const getListNguoiDung = async () => {
  //   let url_api = "https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung";
  //   try {
  //     const reponse = await fetch(url_api); //load data
  //     const json = await reponse.json(); // chuyen data thanh json
  //     setdsnd(json); 
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false); 
  //   }
  // };
  const getListND = () => {
    fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung", {
      method:"GET"
  }).then(res => {
    return res.json()
  }).then(res => {
    if(res){
      setdsnd(res)
    }
  }).catch(err => {
    console.log(err)
  })
  }


  //post data to api
  const handleSubmit = async (err) => {
    err.preventDefault();
    const allInputValue = {
      username: username,
      fullname: fullname,
      password: password,
      rePassword: rePassword,
    };
    let res = await fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(allInputValue),
    });
    
    console.log(allInputValue);
  };
  //delete
  const handleRemove = (user_id) => {
     fetch(`https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung/${user_id}`, {
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
         getListNguoiDung();
       })
       .catch((err) => {
         console.log(err);
       });
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require("../assets/image 44.png")}
      />
      <View style={styles.sectionStyle}>
        {/* tên đăng nhập */}
        <Image
          source={require("../assets/image 46.png")}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder={username}
          onChangeText={(newText) => setUsername(newText)}
          style={{
            flex: 1,
            borderColor: "#fff",
            padding: 10,
            borderStyle: "solid",
            borderWidth: 0,
          }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>

      <View style={styles.sectionStyle}>
        {/* họ tên user */}
        <Image
          source={require("../assets/image 42.png")}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder={fullname}
          onChangeText={(newText) => setFullname(newText)}
          style={{ flex: 1, borderColor: "#fff", padding: 10 }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>
      <View style={styles.sectionStyle}>
        {/* password */}
        <Image
          source={require("../assets/image 45.png")}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder={password}
          onChangeText={(newText) => setPassword(newText)}
          style={{ flex: 1, borderColor: "#fff", padding: 10 }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>
      <View style={styles.sectionStyle}>
        {/* re-password */}
        <Image
          source={require("../assets/image 47.png")}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder={rePassword}
          onChangeText={(newText) => setRePassword(newText)}
          style={{ flex: 1, borderColor: "#fff", padding: 10 }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 7,
            backgroundColor: "#525EAA",
            borderRadius: 5,
            margin: 15,
            borderColor: "white",
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 7,
            backgroundColor: "#525EAA",
            borderRadius: 5,
            borderColor: "white",
            margin: 15,
          }}
        >
          <Text style={{ color: "white" }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* flat list  */}
      <FlatList
        data={dsnd}
        keyExtractor={(item , index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: "#fff" }}>
              <Image
                style={{ width: 50, height: 50 }}
                source={(require = "/assets/image 46.png")}
              />
              <Text>username: {item.username}</Text>
              <Text>fullname: {item.fullname}</Text>
              <Text
                onPress={() => {
                  setModalVisible(true);
                }}
                style={{ fontWeight: "bold", color: "red" }}
              >
                Delete
              </Text>
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
                    <Text style={styles.modalText}>
                      Bạn có chắc chắn muốn xóa không!
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-around",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                          setModalVisible(!modalVisible), handleRemove(item.id);
                        }}
                      >
                        <Text style={styles.textStyle}>Yes</Text>
                      </TouchableOpacity>
                      {/* cancel  */}
                      <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>No</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  stretch: {
    width: 150,
    height: 100,
    resizeMode: "stretch",
  },
  inputContainer: {
    justifyContent: "center",
  },
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },

  //dialog
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
