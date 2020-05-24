import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View} from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import {getTopThreeResults} from "../api/api";

export type TimesUpScreenNavigationParams = {
  readonly id: string;
};

export const TimesUpScreen: React.FC = () => {

  const navigation = useNavigation();
  // @ts-ignore
  const id = navigation.getParam("id");

  useEffect(() => {
    let intID = setInterval(() => {
      const checkForResponse = async (id: string) => {
        const results = await getTopThreeResults(id);
        if (results.length !== 0) {
          navigation.navigate("ResultsScreen", {restaurants: results});
          return;
        }
      }
      checkForResponse(id);
    }, 1000);
    return() => {
      clearInterval(intID);
    }
  });

  return (
    <View style={styles.mainContainer}>
      <View style={{ marginBottom: 40}}>
        <Image style={styles.timesUpImage} source={require("../images/ic_watch_later_24px.png")}></Image>
        <Text style={styles.timesUpText}>Time's up!</Text>
        <Text style={styles.bodyText}>Please wait while the restaurants swipe back...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#006607",
    padding: 40,
  },
  timesUpImage: {
    alignSelf: "center",
    resizeMode: "center",
    width: 250,
  },
  timesUpText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,

  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,
  }
});
