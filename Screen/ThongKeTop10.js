import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DatePickerDialog from "./DatePickerDialog";
import moment from "moment";
import { log } from "react-native-reanimated";
import {Picker} from '@react-native-picker/picker';
// import axios from 'axios';
export default function ThongKe() {
  const hostname = '192.168.126.1'; //ha
  // const hostname = "192.168.1.7"; //long
  //top 10
  const [topBooks, setTopBooks] = useState([]);
  //set ngay picker
  const [selectedValue, setSelectedValue] = useState('08-2023');
  const [totalMuon, setTotalMuon] = useState(0);

  const getTop10WithMonth = (selectedValue) => {
    fetch(`http://${hostname}:3000/top10WithMonth?month=${selectedValue}`)
        .then(response => response.json())
        .then(data => setTopBooks(data))
        .catch(error => console.error(error));
  }
  const getTongSoLuotMuon = () => {
    fetch(`http://${hostname}:3000/soLuotMuon`)
      .then(response => response.json())
      .then(data => {
        setTotalMuon(data.totalMuon);
      })
      .catch(error => {
        console.error(error);
      });
  }
    useEffect(() => {
        {
          getTop10WithMonth(selectedValue)
          getTongSoLuotMuon();
        }
    }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        width: "100%",
        borderWidth: 0.5,
        borderRadius: 10,
        margin: 5,
        padding: 5,
        flexDirection: "column",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        elevation: 5,
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          width: "100%",
          marginLeft: 10,
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        {item.tenSach}
      </Text>
      <Text style={{ width: "100%", marginRight: 10, textAlign: "right" }}>
        {item.totalLuotMuon} lượt mượn
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* tổng lượt mượn  */}
      <Picker
      style={{backgroundColor:"white"}}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {setSelectedValue(itemValue)

        getTop10WithMonth(itemValue)
      console.log(itemValue)}}
      >
        <Picker.Item label="Tháng 1" value="01-2023" />
        <Picker.Item label="Tháng 2" value="02-2023" />
        <Picker.Item label="Tháng 3" value="03-2023" />
        <Picker.Item label="Tháng 4" value="04-2023" />
        <Picker.Item label="Tháng 5" value="05-2023" />
        <Picker.Item label="Tháng 6" value="06-2023" />
        <Picker.Item label="Tháng 7" value="07-2023" />
        <Picker.Item label="Tháng 8" value="08-2023" />
        <Picker.Item label="Tháng 9" value="09-2023" />
        <Picker.Item label="Tháng 10" value="10-2023" />
        <Picker.Item label="Tháng 11" value="11-2023" />
        <Picker.Item label="Tháng 12" value="12-2023" />
      </Picker>
      <View
        style={{
          width: "90%",
          borderWidth: 0.5,
          borderRadius: 10,
          margin: 10,
          padding: 5,
          flexDirection: "column",
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAFAFA",
          elevation: 7,
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../assets/group_icon.png")}
          style={{
            height: 30,
            width: 30,
          }}
        />
        <Text style={{ color: "#4696EB", fontSize: 15 }}>
          Thống kê top 10 theo số lượt mượn sách
        </Text>
  
        <Text>Tổng số lượt mượn sách: {totalMuon}</Text>
      </View>

      {/* flat list  */}
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={topBooks}
        onRefresh={() => getTop10WithMonth()}
        refreshing={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      <StatusBar style="auto" />
    </View>
 
  );
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B0E2FF",
    padding: 15,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    elevation: 5,
    height: 100,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  confirmButton: {
    marginTop: 10,
    padding: 10,
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    marginLeft: 100,
  },
});
