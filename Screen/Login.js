import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from "react-native";
// import { TextInput } from 'react-native-web';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login(props) {
  const [username, setusername] = useState("");
  const [passwd, setpasswd] = useState("");

  const doLogin = () => {
    if (username.length == 0) {
      alert("Chưa nhập username");
      return;
    }
    if (passwd.length == 0) {
      alert("Chưa nhập password");
      return;
    }

    //     let url_check_login ="https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung" + username;
    // // -=-====-=-=-=-=-=-==-=-=-=-=-
    //     fetch( url_check_login)
    //     .then ( (res) => {return res.json()})
    //     .then ( async(res_login) =>{
    //       if(res_login.length != 1)
    //       {
    //         alert("sai username hoặc lỗi trùng lặp dữ liệu");
    //         return;
    //       }else{
    //         let objU = res_login[0];
    //         if(objU.passwd != passwd){
    //           alert("Sai password");
    //           return;
    //         }else{
    //           try {
    //             await AsyncStorage.setItem('loginInfo', json.stringify(objU));
    //               props.navigation.navigate('ManHinhChao')
    //           } catch (e) {
    //             // saving error
    //             console.log(e);
    //           }
    //         }
    //       }
    //     })

    fetch("https://64b89a9421b9aa6eb079f300.mockapi.io/nguoidung")
      .then((response) => response.json())
      .then(async (result) => {
        // tìm user
        const user = result.find((user) => user.username === username);
        // check tai khoản
        if (!user) {
          alert("Tài khoản không tồn tại");
        } else if (user.password !== passwd) {
          // lấy pass của user rồi kiểm tra với pas nhập
          alert("Sai password");
        } else {
          // localStorage.setItem("loginInfo", JSON.stringify(user)); 
          console.log("Thành công")
          // viết chuyển màn hình ở đây nhé bro
          await AsyncStorage.setItem('loginInfo', JSON.stringify(user));
          // props.navigation.navigate('Menu');
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ width: 150, height: 150 }} source={require('../assets/img_manHinhChao.png')} />

      </View>
      <View style={{ flex: 2, backgroundColor: '#fff', width: 350, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20 }}>
        <Text style={{ color: "#525EAA", fontSize: 20, fontWeight: 'bold' }}>Welcome Back!</Text>
        <Text style={{ color: "#525EAA", fontSize: 20, fontWeight: 'bold' }}>Sign in your account</Text>
        <Text style={{marginTop:20, marginBottom:5}}>Username</Text>
        <TextInput
          style={styles.user}
          onChangeText={(txt) => {
            setusername(txt);
          }}
        />
        <Text style={{marginTop:15, marginBottom:5}}>Password</Text>
        <TextInput
          style={styles.user}
          onChangeText={(txt) => {
            setpasswd(txt);
          }}
          textContentType="password"
          secureTextEntry={true}
        />
        {/* <Button title="Login" onPress={doLogin} /> */}
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={styles.btn} onPress={doLogin}>
            <Text style={{color:'#FFFFFF',fontWeight:"bold"}}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} >
            <Text style={{color:'#FFFFFF',fontWeight:"bold"}}>HỦY</Text>
          </TouchableOpacity>
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#525EAA",
    alignItems: "center",
    justifyContent: "center",
  },

  user: {
    borderWidth: 1,
    fontSize:15,
    padding:8,
    borderRadius:7
  },
  btn:{
    flex:1,
    backgroundColor: "#525EAA",
    height:40,
    marginTop:20,
    borderRadius:5,
    justifyContent: "center",
    alignItems:"center",
    marginRight:5,
    marginLeft:5
  }
});
