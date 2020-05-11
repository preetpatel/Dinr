import React, { constructor, useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from "react-native";

export const ReadyScreen: React.FC = () => {

    const [loading, setLoading] = useState(true);
    const [countdown, setCountdown] = useState(3);
    const [loadingText, setLoadingText] = useState("Getting Ready...");

    const handleLoadingDone = ()  => {
        setLoading(false);
    }

    const handleReady = () => {
        // logic for next screen
    }

    const handleCountdown = () => {
        let intID = setInterval (() => {
            if(!loading){
                if(countdown ===  1){
                    clearInterval(intID);
                    setLoadingText("Start!");
                    setLoading(true);
                    handleReady();
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
                    {loading ? loadingText : countdown }
                </Text>
            </View>

            <View style={styles.info}>
                <Image source={require("../images/ic_watch_later_24px.png")}/>
                 <View style={styles.textbox}>
                    <Text style={styles.text}>You will have 120 seconds to swipe through the restaurants</Text>
                 </View>
            </View>
            <Button onPress={handleLoadingDone} title="Start Countdown"/>

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
    }

  });
  