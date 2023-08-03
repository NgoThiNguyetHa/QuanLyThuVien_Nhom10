import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View , Alert, Modal, Button, TextInput, TouchableOpacity } from "react-native";
// import axios from 'axios';
export default function ThemNguoiDung() {
  const [username, setUsername] = useState("");
  const [hoTen, setHoTen] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
  // const handleSubmit = async (err) => {
  //   err.preventDefault();
  //   const allInputValue = {
  //     username: username,
  //     hoTen: hoTen,
  //     password: password,
  //     rePassword: rePassword,
  //   };
  //   let res = await fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung", {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(allInputValue),
  //   });
    
  //   console.log(allInputValue);
  // };
  const handleSubmit = () => {
    const allInputValue = {
      username: username,
      hoTen: hoTen,
      password: password,
      rePassword: rePassword,
    };
    fetch('http://192.168.1.135:3000/insertNguoiDung', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(allInputValue),
    })
    Alert.alert("Them thanh cong");
    setUsername("");
    setHoTen("")
    setPassword("")
    setRePassword("")
    console.log(allInputValue);
  };


  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{
          uri: 'https://cdn.dribbble.com/users/1804673/screenshots/9443949/media/f114a64890767d899a3374fc7a1ef612.png?resize=400x0',
        }}
      />
      <View style={styles.sectionStyle}>
        {/* tên đăng nhập */}
        <Image
         source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/668/668709.png',
        }}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder="Nhập username"
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
          source={{
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7K0UoVnOQAG7tXzKBYaKX6aLCxzSIpIEXlrjrJK2VU-mOT8HBwGIRypGqxzXQqrrWfy8&usqp=CAU"
          }}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder="Nhập họ tên"
          onChangeText={(newText) => setHoTen(newText)}
          style={{ flex: 1, borderColor: "#fff", padding: 10 }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>
      <View style={styles.sectionStyle}>
        {/* password */}
        <Image
          source={{
            uri:"https://cdn-icons-png.flaticon.com/512/6146/6146586.png"
          }}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder="Nhập password"
          onChangeText={(newText) => setPassword(newText)}
          style={{ flex: 1, borderColor: "#fff", padding: 10 }}
          underlineColorAndroid="transparent"
          mode="outlined"
        />
      </View>
      <View style={styles.sectionStyle}>
        {/* re-password */}
        <Image
          source={{
            uri:"https://cdn-icons-png.flaticon.com/512/6357/6357048.png"
          }}
          style={styles.imageStyle}
        />
        <TextInput
          placeholder="Nhập lại mật khẩu"
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
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding:15
  },
  stretch: {
    width: 200,
    height: 200,
  },
  inputContainer: {
    justifyContent: "center",
  },
  sectionStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000000",
    height: 50,
    borderRadius: 5,
    margin: 10,
    padding:5
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
