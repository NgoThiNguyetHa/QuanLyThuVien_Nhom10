import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import DatePickerDialog from './DatePickerDialog'
import moment from 'moment';
import { log } from 'react-native-reanimated';

export default function DoanhThuScreen() {
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const [listPhieuMuon, setListPhieuMuon] = useState([]);
  const [doanhThu, setDoanhThu] = useState(0);

  const [loading, setLoading] = useState(false);


  // dialog chọn ngày bắt đầu
  const showStartDatePicker = () => {
    setStartDatePickerVisible(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisible(false);
  };

  const handleStartDateSelect = (date) => {
    console.log(moment(date).format('DD-MM-YYYY'))
    // {date ? moment(date).format('DD-MM-YYYY') : 'Select a date'}
    if (date) {
      date = moment(date).format('DD-MM-YYYY');
    }
    setSelectedStartDate(date);
    hideStartDatePicker();
  };

  // dialog chọn ngày kết thúc
  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndDateSelect = (date) => {
    console.log(moment(date).format('DD-MM-YYYY'))
    // {date ? moment(date).format('DD-MM-YYYY') : 'Select a date'}
    if (date) {
      date = moment(date).format('DD-MM-YYYY');
    }
    setSelectedEndDate(date);
    hideEndDatePicker();
  };

  //lấy danh sách phiếu mượn theo khoảng ngày
  const getListPhieuMuon = (startDate, endDate) => {
    var raw = "";

    var requestOptions = {
      method: 'GET',
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://192.168.126.1:3000/doanhThu?startDate=${startDate}&endDate=${endDate}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          setListPhieuMuon(result);
          setLoading(false);
          
        }
      })
      .catch(error => console.log('error', error));
  }

  const getDoanhThu = () => {
    // const totalRevenue = listPhieuMuon.reduce((tongDoanhThu, phieuMuon) => tongDoanhThu + parseInt(phieuMuon.tienThue.giaThue), 0);
    let totalRevenue = 0;
    for (const phieuMuon of listPhieuMuon) {

      totalRevenue += parseInt(phieuMuon.tienThue.giaThue);
      console.log('giá: ', phieuMuon.tienThue.giaThue);
      console.log('totalRevenue', totalRevenue);
    }
    console.log(totalRevenue);
    return totalRevenue;
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>


        <View style={{ flexDirection: 'row', elevation: 5, borderRadius: 15, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, shadowColor: '#000', backgroundColor: '#fff', marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={showStartDatePicker}>
            <Image style={{ width: 40, height: 40, }} source={{ uri: "https://daylaixehanoi.vn/wp-content/uploads/2019/10/calendar-512-400x400-400x400.png" }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={selectedStartDate}
            placeholder="Select a date"
          // onFocus={showDatePicker}
          />
          <DatePickerDialog
            visible={isStartDatePickerVisible}
            onSelect={handleStartDateSelect}
            onCancel={hideStartDatePicker}
          />
        </View>

        <View style={{ flexDirection: 'row', elevation: 5, borderRadius: 15, paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, shadowColor: '#000', backgroundColor: '#fff', marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={showEndDatePicker}>
            <Image style={{ width: 40, height: 40, }} source={{ uri: "https://daylaixehanoi.vn/wp-content/uploads/2019/10/calendar-512-400x400-400x400.png" }} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={selectedEndDate}
            placeholder="Select a date"
          // onFocus={showDatePicker}
          />
          <DatePickerDialog
            visible={isEndDatePickerVisible}
            onSelect={handleEndDateSelect}
            onCancel={hideEndDatePicker}
          />
        </View>

        <TouchableOpacity style={styles.btnDoanhThu} onPress={() => {
          getListPhieuMuon(selectedStartDate, selectedEndDate);
          getDoanhThu();

        }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>DOANH THU</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', flex: 1, marginLeft: 40, marginTop: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Doanh thu: </Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{getDoanhThu()+" VND"}</Text>
      </View>
      <View style={{ alignItems: 'center', flex: 1, width: "100%", marginTop: -270 }}>
        <FlatList
          style={{ flex: 1, width: "85%", }}
          data={listPhieuMuon}
          keyExtractor={(item, index) => item._id}
          onRefresh={() => getListPhieuMuon()}
          refreshing={loading}
          renderItem={({ item }) => (
              <View
                style={{
                  borderWidth: 0.5,
                  borderRadius: 10,
                  margin: 10,
                  padding: 5,
                  flexDirection: "row",
                  borderColor: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#FAFAFA",
                  elevation: 5,
                }}
              >
                <View style={{ flexDirection: 'row', flex: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    style={{ borderRadius: 60, width: 100, height: 100, marginLeft: 5, marginRight: 5 }}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                  <View style={{ margin: 5, flexDirection: 'column', flex: 3 }}>


                    <Text>Thành viên: {item.maThanhVien.name}</Text>
                    <Text>Thủ thư: {item.maThuThu.hoTen}</Text>
                    <Text>Sách: {item.maSach.tenSach}</Text>
                    <Text>Ngày mượn: {item.ngayMuon}</Text>
                    <Text>Giá thuê: {item.tienThue.giaThue}</Text>
                    <Text
                      style={item.traSach == 'Yes' ? styles.chuaTraSach : styles.daTraSach}
                    >{item.traSach == 'Yes' ? 'Đã trả sách' : 'Chưa trả sách'}</Text>


                  </View>
                </View>
              </View>

            
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E2FF',


  },
  input: {
    width: 250,
    padding: 10,
    fontSize: 18
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnDoanhThu: {
    backgroundColor: '#009ACD',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    marginTop: 30
  },
  //set style trả sách
  daTraSach: {
    color: "red",
  },
  chuaTraSach: {
    color: "blue"
  },
});
