import React from "react";
import { StyleSheet, Image, View } from "react-native";

export const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo-with-text.png")} style={styles.logo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#006607"
  },
  logo: {
    width: 220,
    resizeMode: "contain",
  }
});
