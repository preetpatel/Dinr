import React from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";

export const HomeScreen: React.FC = () => {
  const [code, changeCode] = React.useState("");
  const [invalidCode, changeCodeInvalid] = React.useState(false);
  const navigation = useNavigation();

  const joinButtonPress = () => {
    // TODO: Change this functionality later to validate session code
    if (code !== "") {
      changeCodeInvalid(true);
    }
  }
  const newSessionPress = () => {
    const data = [
      { id: "1", uri: require('../images/food1.jpg'), restaurantName: "Paradise", stars: 2, price: 3, distance: 1.3, quote: "Something about the indian food just makes my mouth drool" },
      { id: "2", uri: require('../images/food2.jpg'), restaurantName: "Sals Pizza", stars: 3, price: 4, distance: 1.6, quote: "You can never beat the pizza that Sals makes! 100% recommend" },
      { id: "3", uri: require('../images/food3.jpg'), restaurantName: "Bonna Pizzeria", stars: 1, price: 2, distance: 0.3, quote: "Not the greatest pizza tbh... too oily" },
      { id: "4", uri: require('../images/food4.jpg'), restaurantName: "Kati Grill", stars: 4, price: 4, distance: 2.4, quote: "Yummy wraps! Wish they were a bit closer to me" },
      { id: "5", uri: require('../images/food5.jpg'), restaurantName: "Portofino", stars: 5, price: 5, distance: 1, quote: "Amazing views.. super friendly staff who serve you well" },
    ]
    navigation.navigate("SwipeScreen", {timer: 2, restaurantData: data, numberOfRestaurants: 5})
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image source={require("../images/salad-plates.png")} style={styles.saladPlates}/>
        <Text style={styles.tagline}>Match with the restaurant of your dreams!</Text>
      </View>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <View style={{marginTop: 30}}>
          <View style={invalidCode ? [styles.codeInput, styles.invalidCodeBorder]: styles.codeInput}>
            <Image source={require("../images/fork-knife.png")} style={styles.forkKnife}/>
            <TextInput
              style={styles.textInput} value={code}
              placeholder={"Session Invite Code"}
              onChangeText={text => changeCode(text.trim())}
              placeholderTextColor={"#979797"}
            />
          </View>
          <TouchableOpacity
            style={code === "" ? styles.buttonDisabled : styles.buttonEnabled}
            onPress={joinButtonPress}
            disabled={code === ""}
          >
            <Text style={code === "" ? styles.disabledButtonText : styles.enabledButtonText}>Join</Text>
          </TouchableOpacity>
          { invalidCode && code ? <Text style={styles.invalidCodeText}>Invalid code! Please try again.</Text> : null }
        </View>
        <TouchableOpacity style={styles.buttonEnabled} onPress={newSessionPress}>
          <Text style={styles.enabledButtonText}>Start a New Session</Text>
        </TouchableOpacity>
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
    fontFamily: "SFProDisplay-Bold",
    fontSize: 25,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,
  },
  saladPlates: {
    width: 500,
    resizeMode: "contain",
    marginTop: 40,
    alignSelf: "center",
    shadowColor: "#222222",
    shadowOffset: { width: 10, height: 10},
    shadowOpacity: 1,
    shadowRadius: 6
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
    fontFamily: "SFProRounded-Bold",
    flex: 1,
    color: "#979797",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    marginRight: 58,
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
  buttonEnabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  enabledButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#006607",
  },
  invalidCodeText: {
    fontFamily: "SFProText-Medium",
    textAlign: "center",
    fontSize: 15,
    color: "#FF8900",
    marginTop: 15
  },
  invalidCodeBorder: {
    borderColor: "#FF8900",
    borderWidth: 3,
  }
});
