import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ManHinhChinh from './ManHinhChinh';
import { NavigationContainer } from '@react-navigation/native';
import SachScreen from './SachScreen';
import LoaiSachScreen from './LoaiSachScreen';
import ThanhVienScreen from './ThanhVienScreen';
import ThemNguoiDungScreen from './ThemNguoiDungScreen';
import PhieuMuonScreen from './PhieuMuonScreen';
import DoanhThuScreen from './DoanhThuScreen';

const drawer = createDrawerNavigator();

export default function Menu() {
  return (
    

      <drawer.Navigator initialRouteName="ManHinhChinh" >
        {/* <Image/> */}
        <drawer.Screen name='Trang chủ' component={ManHinhChinh} />
        <drawer.Screen name='Quản lý phiếu mượn' component={PhieuMuonScreen} />
        <drawer.Screen name='Quản lý loại sách' component={LoaiSachScreen} />
        <drawer.Screen name='Quản lý sách' component={SachScreen} />
        <drawer.Screen name='Quản lý thành viên' component={ThanhVienScreen} />
        <drawer.Screen name='Thêm người dùng' component={ThemNguoiDungScreen} />
        <drawer.Screen name='Doanh thu' component={DoanhThuScreen} />
      </drawer.Navigator>
    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
