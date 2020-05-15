import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";

export const ReadyScreen: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [readyText, setreadyText] = useState("Ready?");
  const [infoText, setInfoText] = useState(true);
  const [buttonText, setButtonText] = useState("Start Swiping");

  const handleReady = () => {
    setEnabled(false);
    setreadyText("On your fork...");
    setButtonText("Waiting for others...");
    // Will change to wait on others
    setTimeout(() => {
      setReady(true);
      setInfoText(false);
    }, 1000);
  };

  const countdownDone = () => {
    // TODO: Add change screen logic
  };

  const checkSessionReady = () => {
    // TODO: Add logic to check if swiping session ready
  };

  const handleCountdown = () => {
    let intID = setInterval(() => {
      if (ready) {
        if (countdown === 1) {
          clearInterval(intID);
          countdownDone();
        } else {
          setCountdown(countdown - 1);
        }
      }
    }, 1000);
  };

  return (
    <View style={[styles.mainContainer, !infoText && styles.singleElement]}>
      
      {infoText && <View style={{ height: 101 }}/>}

      <View style={{ marginBottom: 30 }}>
        <Image source={require("../images/burgers.png")} style={styles.burgers}/>
        <Text style={styles.tagline}>
          {handleCountdown()}
          {ready ? countdown : readyText}
        </Text>
      </View>

      {infoText ? (
        <View>
          <View style={styles.info}>
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
            <Text style={enabled ? styles.enabledButtonText : styles.disabledButtonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
  singleElement: {
    justifyContent: "center"
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
    marginBottom: 20,
  },
  textbox: {
    width: 235,
  },
  text: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 15,
    color: "#FFFFFF",
    textAlign: "center",
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
});
