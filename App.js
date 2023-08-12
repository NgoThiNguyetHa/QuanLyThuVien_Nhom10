import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManHinhChao from './Screen/ManHinhChao';

import NguoiDung from './Screen/ThemNguoiDungScreen';
import ThanhVien from './Screen/ThanhVienScreen';
import Login from './Screen/Login';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import Menu from './Screen/Menu';
import ManHinhChinh from './Screen/ManHinhChinh';
import LoaiSachScreen from './Screen/LoaiSachScreen';
import SachScreen from './Screen/SachScreen';
import PhieuMuonScreen from './Screen/PhieuMuonScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='ManHinhChao'>
        <Stack.Screen name="ManHinhChao" component={ManHinhChao} />
        <Stack.Screen name="ManHinhChinh" component={ManHinhChinh} />
        <Stack.Screen name="Đăng nhập" component={Login} />
        <Stack.Screen name="Thêm Người Dùng" component={NguoiDung} />
        <Stack.Screen name="Quản lý sách" component={SachScreen}/>
        <Stack.Screen name="Quản lý loại sách" component={LoaiSachScreen} />

        <Stack.Screen name="Quản Lý Thành Viên" component={ThanhVien} />
        <Stack.Screen name="Quản lý phiếu mượn" component={PhieuMuonScreen} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="Trang chủ" component={ManHinhChinh} />

      </Stack.Navigator>
    </NavigationContainer>
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
