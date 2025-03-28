import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Header from './src/componentes/header';
import Timer from './src/componentes/Timer';
import { Audio } from 'expo-av';

const colores = ["#F7DC6F","#A2D9CE","#D7BDE2"];

export default function App() {

  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [CurrentTime, setCurrentTime] = useState("POMO" |"CORTO"| "LARGO");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
   
    if(isActive){
      interval = setInterval (()=>{
        setTime(time -1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    if(time ===0){
      setIsActive(false);
      setIsWorking((prev) > !prev);
      setTime(isWorking ? 300 : 1500);
    }

    return () => clearInterval(interval);
  }, [isActive, time])

  function handlesStartStop(){
    playSound();
    setIsActive(!isActive);
  }

   async function playSound(){
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/click.wav")
    )
    await sound.playAsync();
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colores[CurrentTime]}]}>
    <View style={{
      flex: 1,
      paddingHorizontal: 15, 
      paddingTop: Platform.OS === "android" && 30}}>
      <Text style={styles.text}>Pomodoro</Text>
      <Header 
      CurrentTime={CurrentTime} 
      setCurrentTime={setCurrentTime} 
      setTime ={setTime}/>
     
      <Timer time= {time}/>
      <TouchableOpacity onPress={handlesStartStop} style={styles.button}>
        <Text style={{color: "white", fontWeight: "bold"}}>
        {isActive ? "STOP" : "START"}
        </Text>
      </TouchableOpacity>
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
  fontWeigth: "bold",
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
    
    }
});
