import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Platform } from 'react-native';
import { useState } from 'react';
import Header from './src/componentes/header';

const colores = ["#F7DC6F","#A2D9CE","#D7BDE2"];

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [CurrentTime, setCurrentTime] = useState("POMO" |"CORTO"| "LARGO");

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colores[CurrentTime]}]}>
    <View style={{paddingTop: Platform.OS === "android" && 30}}>
      <Text style={styles.text}>Pomodoro</Text>
      <Text style={styles.text}>{time}</Text>
      <Header CurrentTime={CurrentTime} 
      setCurrentTime={setCurrentTime} 
      setTime ={setTime}/>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  
  text: {
  fontSize:32,
  fontWeigth: "bold"
  }
});
