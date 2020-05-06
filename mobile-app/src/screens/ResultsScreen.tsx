import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";
import { RestaurantTopPick } from "../components/RestaurantTopPick"

export const ResultsScreen: React.FC = () => {
    const [restaurants, setRestaurants ] = useState("");

  const donePress = () => {
    // TODO: Add change screen functionality here
  }

  return (
    <View style={styles.mainContainer}>
        <View>
          <Image style={styles.logoImage} source={require("../images/green-logo-text.png")}></Image>
          <Text style={styles.headerText}>Here are your top picks:</Text>
        </View>
        <View style={styles.restaurantPicksContainer} >
            <RestaurantTopPick></RestaurantTopPick>
            <RestaurantTopPick></RestaurantTopPick>
            <RestaurantTopPick></RestaurantTopPick>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={donePress}>
            <Text style={styles.doneButtonText}> Done</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#EEEEEE",
    padding: 40,
  },
  logoImage: {
    marginTop: 20,
    alignSelf: "center"
  },
  titleText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 58,
    color: "#29732D",
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    color: "#29732D",
    marginTop: 20,

  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,
  },
  restaurantPicksContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  doneButton: {
    borderRadius: 15,
    borderColor: "#006607",
    borderWidth: 2,
    backgroundColor: "#006607",
    height: 48,
    width: 228,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 70
  },
  doneButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontWeight: "bold",
    fontSize: 22,
    color: "#EEEEEE",
  }
});
