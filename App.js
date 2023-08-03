import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManHinhChao from './Screen/ManHinhChao';
import PhieuMuon from './Screen/PhieuMuon';

import NguoiDung from './Screen/ThemNguoiDungScreen';
import ThanhVien from './Screen/ThanhVienScreen';
import Login from './Screen/Login';


import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer } from '@react-navigation/native';
import Menu from './Screen/Menu';
import ManHinhChinh from './Screen/ManHinhChinh';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName='ManHinhChao'>
        <Stack.Screen name="ManHinhChao" component={ManHinhChao} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Thêm Người Dùng" component={NguoiDung} />
        <Stack.Screen name="Quản Lý Thành Viên" component={ThanhVien} />
        <Stack.Screen name="PhieuMuon" component={PhieuMuon} />
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false, gestureEnabled: false }}/>
        <Stack.Screen name="ManHinhChinh" component={ManHinhChinh} />

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
