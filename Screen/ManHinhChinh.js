import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ManHinhChinh() {
  return (
    <View style={styles.container}>
        <View style ={{flex:1, backgroundColor: "white",flexDirection: "row", alignItems:'center'}}>
            <TouchableOpacity style={styles.item}>
                <Image style ={{width: 120, height: 120}} source={require('../assets/img_loaiSach.png')}/>
                <Text style={{fontWeight: 'bold'}}>Loại sách</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image style ={{width: 120, height: 120}} source={require('../assets/img_sach.png')}/>
                <Text style={{fontWeight: 'bold'}}>Sách</Text>
            </TouchableOpacity>
            
        </View>

        <View style ={{flex:1, backgroundColor: "white",flexDirection: "row"}}>
            <TouchableOpacity style={styles.item}>
                <Image style ={{width: 120, height: 120}} source={require('../assets/img_thanhVien.png')}/>
                <Text style={{fontWeight: 'bold'}}>Thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image style ={{width: 120, height: 120}} source={require('../assets/img_phieuMuon.png')}/>
                <Text style={{fontWeight: 'bold'}}>Phiếu mượn</Text>
            </TouchableOpacity>
            
        </View>
        <View style ={{flex:1, backgroundColor: "white",flexDirection: "row"}}>
            <TouchableOpacity style={{width: 320,
    height: 150,
    paddingLeft:20,
    alignItems:'center',
    borderWidth: 2,
    borderColor: "gray",
    borderRadius:20,
    marginTop: -50,
    marginLeft:20, flexDirection:'row'}}>
                <Image style ={{width: 120, height: 120}} source={require('../assets/img_thongKe.png')}/>
                <Text style={{fontWeight: 'bold', marginLeft:20}}>Thống kê doanh thu</Text>
            </TouchableOpacity>
            
            
        </View>

     
    
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  item:{
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "gray",
    borderRadius:20,
    marginLeft:20,
    
  }
});
