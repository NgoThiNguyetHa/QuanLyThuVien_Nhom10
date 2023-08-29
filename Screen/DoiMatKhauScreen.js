import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View , Alert, Modal, Button, TextInput, TouchableOpacity } from "react-native";
// import axios from 'axios';
export default function DoiMatKhauScreen({route}) {

  const user = route.params.user;
  console.log(user._id + "-" + user.password );
  

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [showOld,setShowOld] = useState(true);
  const [showNew,setShowNew] = useState(true);
  const [showReNew,setShowReNew] = useState(true);


  const hostname = "192.168.1.6";
  // const handleUpdate = () => {
  //   const allInputValue = {
  //     password: newPassword,
  //   };
  //   if (password !== user.password) {
  //       alert("Password không đúng");
  //   } else if (reNewPassword !== newPassword) {
  //       alert("Mật khẩu không trùng khớp");
  //   }else{
  //   fetch(`http://${hostname}:3000/updateNguoiDung/${user._id}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(allInputValue),
    
  //   })
    
  //   Alert.alert("Update thanh cong");
  //   setPassword("");
  //   setNewPassword("");
  //   setReNewPassword("");
  //   console.log(allInputValue);
  //   }
  // };
  const handleUpdate = (_id , newPassword) => {
    const allInputValue = {
      password: newPassword,
    };
    if (password !== user.password) {
        alert("Password không đúng");
    } else if (reNewPassword !== newPassword) {
        alert("Mật khẩu không trùng khớp");
    }else{
     fetch(`http://${hostname}:3000/updateNguoiDung/${_id}`, {
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
         setPassword("");
         setNewPassword("")
         setReNewPassword("");
         Alert.alert("Update thanh cong");
       })
       .catch((err) => {
         console.log(err);
       });
      }
  }


  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{
          uri: 'https://o.remove.bg/downloads/3b927e4a-2233-4f6b-bc6a-7a1b340b2013/Password-03-removebg-preview.png',
        }}
      />
      {/* password cũ  */}
      <View style={styles.sectionStyle}>
        {/* tên đăng nhập */}
        
        <TextInput
          placeholder="Mật khẩu cũ"
          value={password}
          onChangeText={(newText) => setPassword(newText)}
          style={{
            flex: 1,
            borderColor: "#fff",
            padding: 10,
            borderStyle: "solid",
            borderWidth: 0,
          }}

          underlineColorAndroid="transparent"
          mode="outlined"
          textContentType="password"
          secureTextEntry={showOld}
        />
        <TouchableOpacity
        style={{padding:5}}
        onPress={() => {
            if(showOld == true){
                setShowOld(false)
            }else{
                setShowOld(true)
            }
        }}
        >
        <Image
         source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsK-IHhcXc_hYa4DY3OrZq6pG7AHCWwBUhYA&usqp=CAU',
        }}
          style={styles.imageStyle}
        />
        </TouchableOpacity>
        
      </View>
     {/* password cũ  */}
      <View style={styles.sectionStyle}>
        {/* tên đăng nhập */}
        
        <TextInput
          placeholder="Mật khẩu mới"
           value={newPassword}
          onChangeText={(newText) => setNewPassword(newText)}
          style={{
            flex: 1,
            borderColor: "#fff",
            padding: 10,
            borderStyle: "solid",
            borderWidth: 0,
          }}
          underlineColorAndroid="transparent"
          textContentType="password"
          secureTextEntry={showNew}
          mode="outlined"
        />
        <TouchableOpacity
        style={{padding:5}}
        onPress={() => {
            if(showNew == true){
                setShowNew(false)
            }else{
                setShowNew(true)
            }
        }}
        >
            <Image
         source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsK-IHhcXc_hYa4DY3OrZq6pG7AHCWwBUhYA&usqp=CAU',
        }}
          style={styles.imageStyle}
        />
        </TouchableOpacity>
        
      </View>
      {/* password cũ  */}
      <View style={styles.sectionStyle}>
        {/* tên đăng nhập */}
        
        <TextInput
          placeholder="Nhập lại mật khẩu"
           value={reNewPassword}
          onChangeText={(newText) => setReNewPassword(newText)}
          style={{
            flex: 1,
            borderColor: "#fff",
            padding: 10,
            borderStyle: "solid",
            borderWidth: 0,
          }}
          underlineColorAndroid="transparent"
          mode="outlined"
          textContentType="password"
          secureTextEntry={showReNew}
        />
        <TouchableOpacity
        style={{padding:5}}
        onPress={() => {
            if(showReNew == true){
                setShowReNew(false)
            }else{
                setShowReNew(true)
            }
        }}
        >
            <Image
         source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsK-IHhcXc_hYa4DY3OrZq6pG7AHCWwBUhYA&usqp=CAU',
        }}
          style={styles.imageStyle}
        />
        </TouchableOpacity>
        
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
            backgroundColor: "#009ACD",
            borderRadius: 5,
            margin: 15,
            borderColor: "white",
          }}
          onPress={()=>{
            handleUpdate(user._id,newPassword);
          }}
        >
          <Text style={{ color: "white" }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 7,
            backgroundColor: "#009ACD",
            borderRadius: 5,
            borderColor: "white",
            margin: 15,
          }}
          onPress= {
            ()=>{
                setPassword("");
                setNewPassword("");
                setReNewPassword("");
            }
          }
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
    backgroundColor: '#B0E2FF',
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
