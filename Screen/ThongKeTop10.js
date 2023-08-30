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
  const hostname = "192.168.1.6";
  //top 10
  const [topBooks, setTopBooks] = useState([]);
  //tổng số lượt mượn
  const [bookCounts, setBookCounts] = useState({});

  const [selectedMonth, setSelectedMonth] = useState("08");
  //set ngay picker
  const [isDatePickerVisible, setIsPickerVisible] = useState(false);

  const [selectDate, setSelectDate] = useState("");

    
    useEffect(() => {
      fetch(`http://${hostname}:3000/top-10-books`)
        .then(response => response.json())
        .then(data => setTopBooks(data))
        .catch(error => console.error(error));
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
        {item.count} lượt mượn
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* tổng lượt mượn  */}
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
        {Object.keys(bookCounts).map(idSach => (
        <Text key={idSach}>
          Số lần mượn sách có idSach {idSach}: {bookCounts[idSach]}
        </Text>
      ))}
        <Text style={{ fontSize: 15 }}> Tổng số lượt mượn : 10</Text>
      </View>

      {/* flat list  */}
      <FlatList
        style={{ flex: 1, width: "100%" }}
        data={topBooks}
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
