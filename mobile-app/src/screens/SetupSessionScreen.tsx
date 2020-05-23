import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Slider from '@react-native-community/slider';
import {useNavigation} from "@navigation/hooks/useNavigation";
import { setupInteraction } from "../api/api";
import Geolocation from "@react-native-community/geolocation";

interface Cuisine {
  name: string,
  selected: boolean,
  id: number,
}

interface CuisineGridProps {
  cuisines: Cuisine[],
  onCuisinePress: (cuisine: Cuisine) => void,
}

export const SetupSessionScreen: React.FC = () => {
  const [priceLevel, changePrice] = React.useState(1);
  const navigation = useNavigation();
  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);

  // TODO: Remove dummy data and grab for Zomato API
  const cuisines: Cuisine[] = [
    {
      name: "Indian",
      selected: false,
      id: 1,
    },
    {
      name: "Italian",
      selected: false,
      id: 2,
    },
    {
      name: "European",
      selected: false,
      id: 4,
    },
    {
      name: "Cafe Food",
      selected: false,
      id: 5,
    },
    {
      name: "Coffee and Tea",
      selected: false,
      id: 11,
    },
    {
      name: "Desserts",
      selected: false,
      id: 12,
    },
    {
      name: "Asian",
      selected: false,
      id: 13,
    },
    {
      name: "Chinese",
      selected: false,
      id: 14,
    },
    {
      name: "Japanese",
      selected: false,
      id: 15,
    },
  ];

  const [cuisineState, changeCuisineState] = React.useState<Cuisine[]>(cuisines);


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
    const newState = cuisineState.map((c) => {
      if (c.id === cuisine.id) {
        return {...c, selected: !c.selected};
      } else {
        return c;
      }
    });
    changeCuisineState(newState);
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
        <CuisinesGrid cuisines={cuisineState} onCuisinePress={onCuisinePress}/>
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
        disabled={!enableButton}
        style={enableButton ? styles.buttonEnabled : styles.buttonDisabled}
        onPress={onContinuePress}
      >
        <Text
          style={enableButton ? styles.enabledButtonText :  styles.disabledButtonText}
        >
          Invite Friends
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CuisinesGrid = (props: CuisineGridProps) => {
  let numCols = Math.ceil(props.cuisines.length / 4);

  return (
    <View style={{ marginBottom: 30, marginHorizontal: -40 }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      >
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={props.cuisines}
          numColumns={numCols}
          renderItem={({item, index}) => {
            let marginRight = 7.5;
            let marginLeft = 7.5;
            if (index === numCols || index === 3 * numCols) {
              marginLeft = 30;
            } else if (index === 0 || index === 2 * numCols) {
              marginLeft = 10;
            }
            if (index === numCols - 1 || index === 2 * numCols - 1 || index === 3 * numCols - 1 || index === 4 * numCols - 1) {
              marginRight = 20;
            }

            return (
              <TouchableOpacity
                key={item.id}
                style={[item.selected ? styles.cuisineSelected : styles.cuisineUnselected, {marginLeft: marginLeft, marginRight: marginRight}]}
                onPress={() => props.onCuisinePress(item)}
              >
                <Text style={item.selected ? styles.selectedCuisineText : styles.sliderKeyText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

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
  selectedCuisineText: {
    fontFamily: "SFProDisplay-Bold",
    color: "#006607",
    fontSize: 12,
  },
  cuisineUnselected: {
    margin: 5,
    width: 120,
    display: "flex",
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#006607",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  cuisineSelected: {
    margin: 5,
    width: 120,
    display: "flex",
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
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
