import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ManHinhChinh({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={{ flex: 0.2, backgroundColor: "#B0E2F", flexDirection: "row", alignItems: 'center', marginTop: 40 }}>
        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Quản lý loại sách') }}>
          <Image style={{ width: 120, height: 120 }} source={require('../assets/img_loaiSach.png')} />
          <Text style={{ fontWeight: 'bold' }}>Loại sách</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Quản lý sách') }}>
          <Image style={{ width: 120, height: 120 }} source={require('../assets/img_sach.png')} />
          <Text style={{ fontWeight: 'bold' }}>Sách</Text>
        </TouchableOpacity>

      </View>

      <View style={{ flex: 0.3, backgroundColor: "#B0E2F", flexDirection: "row", alignItems: 'center', }}>
        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Quản Lý Thành Viên') }}>
          <Image style={{ width: 120, height: 120 }} source={require('../assets/img_thanhVien.png')} />
          <Text style={{ fontWeight: 'bold' }}>Thành viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Quản lý phiếu mượn') }}>
          <Image style={{ width: 120, height: 120 }} source={require('../assets/img_phieuMuon.png')} />
          <Text style={{ fontWeight: 'bold' }}>Phiếu mượn</Text>
        </TouchableOpacity>

      </View>
      <View style={{ flex: 0.3, backgroundColor: "#B0E2F", flexDirection: "row" }}>
        <TouchableOpacity style={{
          width: "80%",
          height: "70%",
          justifyContent: "center",
          alignItems: 'center',
          elevation: 10,
          padding: 10,
          backgroundColor: "#FAFAFA",
          // borderWidth: 1,
          borderColor: "#f5f5f5",
          borderColor: "gray",
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: '#fff'
        }} onPress={() => { navigation.navigate('Doanh thu') }}>
          <Image style={{ width: 120, height: 120 }} source={require('../assets/img_thongKe.png')} />
          <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Thống kê doanh thu</Text>
        </TouchableOpacity>


      </View>



      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0E2FF',
    alignItems: 'center',


  },
  item: {

    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
    elevation: 10,
    padding: 10,
    backgroundColor: "#FAFAFA",
    // borderWidth: 1,
    borderColor: "#f5f5f5",
    // margin: 10,
    // borderRadius: 5,
    // elevation: 10,
    //xem còn lab 6 asm da nen tang k
    //thử xem xem toàn thấy lab đấy dùng grid layout
    //thê cx đc đều r
  }
});
