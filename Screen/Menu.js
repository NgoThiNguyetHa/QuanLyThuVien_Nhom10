import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PhieuMuon from './PhieuMuon';
import ManHinhChinh from './ManHinhChinh';
import { NavigationContainer } from '@react-navigation/native';

const drawer = createDrawerNavigator();

export default function Menu() {
  return (
    
      <drawer.Navigator initialRouteName="ManHinhChinh" >
        <drawer.Screen name='ManHinhChinh' component={ManHinhChinh} />
        <drawer.Screen name='PhieuMuon' component={PhieuMuon} />
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
