import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View} from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export const TimesUpScreen: React.FC = () => {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ResultsScreen");
    }, 1000)
  })

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
    padding: wp('10%'),
  },
  timesUpImage: {
    alignSelf: "center",
    resizeMode: "center",
    width: '80%',
  },
  timesUpText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: hp('3%'),

  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: hp('3%'),
  }
});
