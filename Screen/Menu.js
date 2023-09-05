import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ManHinhChinh from './ManHinhChinh';
import { NavigationContainer } from '@react-navigation/native';
import SachScreen from './SachScreen';
import LoaiSachScreen from './LoaiSachScreen';
import ThanhVienScreen from './ThanhVienScreen';
import ThemNguoiDungScreen from './ThemNguoiDungScreen';
import PhieuMuonScreen from './PhieuMuonScreen';
import DoanhThuScreen from './DoanhThuScreen';
import DoiMatKhau from './DoiMatKhauScreen'
import ThongKe from './ThongKeTop10';
import Login from './Login';
import ManHinhChao from './ManHinhChao'
const drawer = createDrawerNavigator();

export default function Menu({ route}) {
  const user = route.params.user;

  console.log(user.username);
  function shouldHideSettings() {
    // Logic kiểm tra trạng thái để quyết định ẩn hiện
    // Trả về true để ẩn và false để hiện
    if (user.username === "admin") {
      return false;
    }
    // Hoặc false tùy theo logic của bạn
  }

  return (


    <drawer.Navigator initialRouteName="ManHinhChinh">
      {/* <Image/> */}

      <drawer.Screen name='Trang chủ' component={ManHinhChinh} />
      <drawer.Screen name='Quản lý loại sách' component={LoaiSachScreen} />
      <drawer.Screen name='Quản lý sách' component={SachScreen} />
      <drawer.Screen name='Quản lý phiếu mượn' component={PhieuMuonScreen} />
      <drawer.Screen name='Quản lý thành viên' component={ThanhVienScreen} />
      <drawer.Screen name='Doanh thu' component={DoanhThuScreen} />
      <drawer.Screen name='Thống kê top 10' component={ThongKe} />

      {/* <drawer.Screen name='Thêm người dùng' component={ThemNguoiDungScreen} 
        options={{
          drawerLabel: 'Thêm người dùng', // Nội dung của mục
          drawerStyle: shouldHideSettings() ? { display: 'none' } : {}, // Kiểu dáng để ẩn
        }}
        /> */}
      {user.username === 'admin' ? (
        <drawer.Screen name='Thêm người dùng' component={ThemNguoiDungScreen}
        />
        ) : null}
        <drawer.Screen name='Đổi mật khẩu' component={DoiMatKhau}
        initialParams={{ user }}/>
        <drawer.Screen name='Đăng xuất' component={ManHinhChao} 
        options={{headerShown: false}} 
        />
        
      </drawer.Navigator>
    

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
