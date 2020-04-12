import React from "react";
import { StyleSheet, Text, Image, View, TextInput } from "react-native";

export const HomeScreen: React.FC = () => {
  const [code, onCodeChange] = React.useState("");

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image source={require("../images/salad-plates.png")} style={styles.saladPlates}/>
        <Text style={styles.tagline}>Match with the restaurant of your dreams!</Text>
      </View>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <View style={{marginTop: 30}}>
          <View style={styles.codeInput}>
            <Image source={require("../images/fork-knife.png")} style={styles.forkKnife}/>
            <TextInput 
              style={styles.textInput} value={code} 
              placeholder={"Session Invite Code"} 
              onChangeText={text => onCodeChange(text.trim())}
            />
          </View>
          <View style={code === "" ? styles.joinButtonDisabled : styles.joinButtonEnabled}>
            <Text style={code === "" ? styles.disabledText : styles.enabledText}>Join</Text>
          </View>
        </View>
        <View style={styles.joinButtonEnabled}>
          <Text style={styles.enabledText}>Host a New Session</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#006607",
    padding: 40,
  },
  tagline: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
  },
  saladPlates: {
    width: 600,
    resizeMode: "contain",
    marginTop: 60,
    alignSelf: "center"
  },
  codeInput: {
    borderRadius: 15,
    borderColor: "#979797",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  forkKnife: {
    marginHorizontal: 20,
    height: 20,
    width: 18,
    resizeMode: "contain"
  },
  textInput: {
    flex: 1,
    color: "#979797",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    marginRight: 58,
  },
  joinButtonDisabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  joinButtonEnabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006607",
  }
});
