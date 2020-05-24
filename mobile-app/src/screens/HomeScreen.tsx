import React from "react";
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity } from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getInteractionValid, joinSession} from "../api/api";

export const HomeScreen: React.FC = () => {
  const [code, changeCode] = React.useState("");
  const [invalidCode, changeCodeInvalid] = React.useState(false);
  const navigation = useNavigation();

  const joinButtonPress = async () => {
    if (await getInteractionValid(code)) {
      await joinSession(code);
      navigation.navigate("WaitingScreen", {isHost: false, code: code})
    } else {
      changeCodeInvalid(true);
    }
  }
  const newSessionPress = () => {
    navigation.navigate("SetupSessionScreen");
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
              onChangeText={text => changeCode(text.trim().toUpperCase().substring(0,6))}
              placeholderTextColor={"#979797"}
            />
          </View>
          <TouchableOpacity
            style={code.length !== 6 ? styles.buttonDisabled : styles.buttonEnabled}
            onPress={joinButtonPress}
            disabled={code.length !== 6}
          >
            <Text style={code.length !== 6 ? styles.disabledButtonText : styles.enabledButtonText}>Join</Text>
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
    padding: wp('10%'),
  },
  tagline: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 25,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: hp('3%'),
  },
  saladPlates: {
    width: 500,
    resizeMode: "contain",
    marginTop: hp('5%'),
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
    height: hp('6%'),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: hp('2%'),
  },
  forkKnife: {
    marginHorizontal: wp('6%'),
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
    marginRight: wp('15%'),
  },
  buttonDisabled: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: hp('6%'),
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
    height: hp('6%'),
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
    marginTop: hp('3%')
  },
  invalidCodeBorder: {
    borderColor: "#FF8900",
    borderWidth: 3,
  }
});
