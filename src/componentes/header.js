import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const opciones =["Pomodoro","Descanso Corto", "Descanso Largo"];

export default function Header({CurrentTime, setCurrentTime, setTime}){

    function handlePress(index){
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
        setCurrentTime(index);
        setTime(newTime * 60);
    }

    return (
        <View style={{ flexDirection: "row"}}>
            {opciones.map((item, index) => (
                <TouchableOpacity 
                key={index} 
                onPress={() => handlePress(index)} 
                style={[styles.itemStyle, CurrentTime !== index && {borderColor: "transparent"}]}>
                    <Text style={{fontWeight:"bold"}}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle:{
        width: "33%",
        alignItems: "center",
        borderWidth:3,
        padding: 5,
        borderRadius: 10,
        borderColor: "white",
        marginVertical: 20,
    }
})