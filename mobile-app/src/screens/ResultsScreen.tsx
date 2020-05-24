import React, {useEffect, useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";
import { RestaurantTopPick } from "../components/RestaurantTopPick"
import {useNavigation} from "@navigation/hooks/useNavigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
    padding: wp('10%'),
  },
  logoImage: {
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
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
    marginTop: hp('5%'),
  },
  restaurantPicksContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: hp('5%'),
  },
  doneButton: {
    borderRadius: 15,
    borderColor: "#006607",
    borderWidth: 2,
    backgroundColor: "#006607",
    height: hp('6%'),
    maxHeight: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: hp('10%')
  },
  doneButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontWeight: "bold",
    fontSize: 22,
    color: "#EEEEEE",
  }
});
