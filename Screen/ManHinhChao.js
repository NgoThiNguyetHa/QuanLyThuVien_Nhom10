import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default function ManHinhChao({navigation}) {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Đăng nhập'); // Chuyển đến màn hình login sau 2 giây

    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={{width:350, height:350}} source = {require('../assets/img_manHinhChao.png')}/>
      <StatusBar style="auto" />
    </View>
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
