import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

export const ReadyScreen: React.FC = () => {

    const [enabled, setEnabled] = useState(true);
    const [ready, setReady] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [readyText, setreadyText] = useState("Ready?");
    const [infoText, setInfoText] = useState(true);


    const handleReady = () => {
        setEnabled(false);
        setreadyText("On your fork...");
        setTimeout  (() => {
            setReady(true);
            setInfoText(false);
        }, 1000)
    }

    const countdownDone = () => {
        //TODO: Add change screen logic
    }

    const handleCountdown = () => {
        let intID = setInterval (() => {
            if(ready){
                if(countdown ===  1){
                    clearInterval(intID);
                    countdownDone();
                } else {
                    setCountdown(countdown - 1)
                }
            }
        }, 1000)
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{paddingTop: 200}}>
                <Image source={require("../images/burgers.png")} style={styles.burgers}/>
                <Text style={styles.tagline}>
                    {handleCountdown()}
                    {ready ? countdown : readyText }
                </Text>
            </View>

            <View style={infoText ? styles.info : styles.infoDisbaled}>
                <Image source={require("../images/ic_watch_later_24px.png")}/>
                 <View style={styles.textbox}>
                    <Text style={styles.text}>You will have 120 seconds to swipe through the restaurants</Text>
                 </View>
            </View>
            <TouchableOpacity
                style={enabled ? styles.buttonEnabled : styles.buttonDisabled} 
                onPress={handleReady}   
                disabled={!enabled} 
            >
                <Text style={enabled ? styles.enabledButtonText : styles.disabledButtonText}>Start Swiping</Text>
            </TouchableOpacity>

        </View>
    );
};



const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#006607",
      padding: 40,
    },
    tagline: {
      fontFamily: "SFProDisplay-Bold",
      fontWeight: "bold",
      fontSize: 40,
      textAlign: "center",
      color: "#FFFFFF",
      marginTop: 20,
    },
    burgers: {
        alignSelf: "center",
        resizeMode: "contain",
    },
    info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textbox: {
        width: 235,
    },
    text: {
        fontFamily: "SFProDisplay-Bold",
        fontSize: 15,
        color: "#FFFFFF",
        textAlign: "center"
    },
    buttonEnabled: {
        borderRadius: 15,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        backgroundColor: "#FFFFFF",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonDisabled: {
        borderRadius: 15,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        backgroundColor: "rgba(0, 0, 0, 0)",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButtonText: {
        fontFamily: "SFProDisplay-Medium",
        fontSize: 20,
        color: "#FFFFFF",
    },
    enabledButtonText: {
        fontFamily: "SFProDisplay-Medium",
        fontSize: 20,
        color: "#006607",
    },
    infoDisbaled: {
        display: "none",
    }
  });
  