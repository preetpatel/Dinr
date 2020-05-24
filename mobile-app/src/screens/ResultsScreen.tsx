import React, {useEffect, useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";
import { RestaurantTopPick } from "../components/RestaurantTopPick"
import {useNavigation} from "@navigation/hooks/useNavigation";

export type ResultsScreenNavigationParams = {
  readonly restaurants: unknown;
};

export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const [data, setData] = useState(navigation.getParam("restaurants"));

  const donePress = () => {
    navigation.navigate("HomeScreen");
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image style={styles.logoImage} source={require("../images/green-logo-text.png")}/>
        <View>
          <Text style={styles.headerText}>Here are your top picks:</Text>
          <View style={styles.restaurantPicksContainer} >
            {data.map((data: { address: string; distance: number; image: string; name: string; priceRange: number; id: number; }) => {
              return(
                  <RestaurantTopPick key={data.id} address={data.address} distance={data.distance} image={data.image} name={data.name} priceRange={data.priceRange}/>
              )
            })}
          </View>
        </View>
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
    marginTop: 50,
    marginBottom: 40,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain"
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
    justifyContent: "space-between",
    marginTop: 45,
  },
  doneButton: {
    borderRadius: 15,
    borderColor: "#006607",
    borderWidth: 2,
    backgroundColor: "#006607",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 70
  },
  doneButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontWeight: "bold",
    fontSize: 22,
    color: "#EEEEEE",
  }
});
