import React from "react";
import { StyleSheet, Text, Image, View} from "react-native";

export const TimesUpScreen: React.FC = () => {

  return (
    <View style={styles.mainContainer}>
      <View style={{flex: 1, justifyContent: "space-between"}}>
        <View style={{marginTop: 30}}>
          <Image style={styles.timesUpImage} source={require("../images/ic_watch_later_24px.png")}></Image>
          <Text style={styles.timesUpText}>Time's up!</Text>
          <Text style={styles.bodyText}>Please wait while the restaurants swipe back...</Text>
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
  timesUpImage: {
    marginTop: 100,
    alignSelf: "center"
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
