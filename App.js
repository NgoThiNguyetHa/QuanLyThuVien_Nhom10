import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ManHinhChao from './Screen/ManHinhChao';
import PhieuMuon from './Screen/PhieuMuon';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Menu from './Screen/Menu';
import ManHinhChinh from './Screen/ManHinhChinh';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ManHinhChao" component={ManHinhChao} />
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
