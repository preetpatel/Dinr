import React, {useEffect, useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Slider from '@react-native-community/slider';
import {useNavigation} from "@navigation/hooks/useNavigation";
import { setupInteraction } from "../api/api";
import Geolocation from "@react-native-community/geolocation";
import Cuisine, { cuisines } from "@config/Cuisines";
import CuisinesGrid from "@components/CuisinesGrid";

export const SetupSessionScreen: React.FC = () => {
  const [priceLevel, changePrice] = React.useState(1);
  const navigation = useNavigation();
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);
  const [loadingData, setLoadingData] = useState(false);

  const [cuisineState, changeCuisineState] = React.useState<Cuisine[]>(cuisines);
  const [selectedCuisine, changeSelectedCuisine] = React.useState<Cuisine>();

  useEffect(() => {
    Geolocation.getCurrentPosition(async (position) => {
      setLat(Number(position.coords.latitude));
      setLon(Number(position.coords.longitude));
    });
  });
  const displayPrice = () => {
    let value = "";
    for (let i = 0; i < priceLevel; i++) {
      value += "$";
    }
    return value;
  }

  const onBackPress = () => {
    navigation.navigate("HomeScreen");
  };

  const onContinuePress = async () => {
  setLoadingData(true);
   let interactionData: any = await setupInteraction(lat, lon, getChosenCuisines(), priceLevel);
   navigation.navigate("WaitingScreen", {
     isHost: true,
     code: interactionData.id,
   });
  }

  const getChosenCuisines = () => {
    let chosenCuisines: Cuisine[] = [];
    for (let cuisine of cuisineState) {
      if (cuisine.selected) {
        chosenCuisines.push(cuisine);
      }
    }

    return chosenCuisines.map(cuisine => cuisine.name);
  }

  const onCuisinePress = (cuisine: Cuisine) => {
    if (selectedCuisine === undefined) {
      const newState = cuisineState.map((c) => {
        if (c.id === cuisine.id) {
          return {...c, selected: !c.selected};
        } else {
          return c;
        }
      });
      changeCuisineState(newState);
      changeSelectedCuisine(cuisine);
    } else if (selectedCuisine.id === cuisine.id) {
      const newState = cuisineState.map((c) => {
        if (c.id === cuisine.id) {
          return {...c, selected: false};
        } else {
          return c;
        }
      });
      changeCuisineState(newState);
      changeSelectedCuisine(undefined);
    }
  };

  const anyCuisinesSelected = () => {
    return cuisineState.some((c) => {
      return c.selected;
    });
  }

  const enableButton = anyCuisinesSelected();

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={require("../images/back-arrow.png")} style={styles.backArrow}/>
          </TouchableOpacity>
          <Text style={styles.headerText}>Setup Session</Text>
          <View style={{ width: 30 }}/>
        </View>
        <Image source={require("../images/logo-with-text.png")} style={styles.logo}/>
        <CuisinesGrid cuisines={cuisineState} onCuisinePress={onCuisinePress} selectedCuisine={selectedCuisine}/>
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTextContainer}>
            <Text style={styles.sliderHeaderText}>Price</Text>
            <Text style={styles.sliderValueText}>{displayPrice()}</Text>
          </View>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={5}
            onValueChange={(value) => {changePrice(value)}}
            value={priceLevel}
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            minimumTrackTintColor="#FFFFFF"
          />
          <View style={styles.sliderTextContainer}>
            <Text style={[styles.sliderKeyText, { marginLeft: 4 }]}>Low</Text>
            <Text style={[styles.sliderKeyText, { marginRight: 3 }]}>High</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        disabled={!enableButton || loadingData}
        style={enableButton && !loadingData ? styles.buttonEnabled : styles.buttonDisabled}
        onPress={onContinuePress}
      >
        <Text
          style={enableButton && !loadingData ? styles.enabledButtonText :  styles.disabledButtonText}
        >
          {loadingData? "Just a sec" : "Invite Friends" }
        </Text>
      </TouchableOpacity>
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
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  backArrow: {
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
  logo: {
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 50,
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 30,
  },
  sliderTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "flex-end",
    marginBottom: 10,
  },
  sliderHeaderText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#FFFFFF",
    fontSize: 20,
  },
  sliderValueText: {
    fontFamily: "SFProDisplay-Regular",
    color: "#FFFFFF",
    fontSize: 18,
  },
  sliderKeyText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#FFFFFF",
    fontSize: 12,
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
});

export default SetupSessionScreen;
