import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, ScrollView } from "react-native";
import Slider from '@react-native-community/slider';
import {useNavigation} from "@navigation/hooks/useNavigation";

interface Cuisine {
  name: string,
  selected: boolean,
  id: number,
}

interface CuisineGridProps {
  cuisines: Cuisine[],
  onCuisinePress: (cuisine: Cuisine) => void,
}

export const SettingsScreen: React.FC = () => {
  const [distance, changeDistance] = React.useState(1);
  const [priceLevel, changePrice] = React.useState(1);
  const navigation = useNavigation();
  
  // TODO: Remove dummy data
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
      name: "French",
      selected: false,
      id: 4,
    },
    {
      name: "Spanish",
      selected: false,
      id: 5,
    },
    {
      name: "Brunch",
      selected: false,
      id: 11,
    },
    {
      name: "Dessert",
      selected: false,
      id: 12,
    },
    {
      name: "Ice cream",
      selected: false,
      id: 13,
    },
    {
      name: "Bubble tea",
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

  const onContinuePress = () => {
    const data = [
      { id: "1", uri: require('../images/food1.jpg'), restaurantName: "Paradise", stars: 2, price: 3, distance: 1.3, quote: "Something about the indian food just makes my mouth drool" },
      { id: "2", uri: require('../images/food2.jpg'), restaurantName: "Sals Pizza", stars: 3, price: 4, distance: 1.6, quote: "You can never beat the pizza that Sals makes! 100% recommend" },
      { id: "3", uri: require('../images/food3.jpg'), restaurantName: "Bonna Pizzeria", stars: 1, price: 2, distance: 0.3, quote: "Not the greatest pizza tbh... too oily" },
      { id: "4", uri: require('../images/food4.jpg'), restaurantName: "Kati Grill", stars: 4, price: 4, distance: 2.4, quote: "Yummy wraps! Wish they were a bit closer to me" },
      { id: "5", uri: require('../images/food5.jpg'), restaurantName: "Portofino", stars: 5, price: 5, distance: 1, quote: "Amazing views.. super friendly staff who serve you well" },
    ];
    navigation.navigate("SwipeScreen", {timer: 120, restaurantData: data});
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
            <Text style={styles.sliderHeaderText}>Distance</Text>
            <Text style={styles.sliderValueText}>{distance} km</Text>
          </View>
          <Slider 
            step={1} 
            minimumValue={1}
            maximumValue={50} 
            onValueChange={(value) => {changeDistance(value)}} 
            value={distance}
            maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
            minimumTrackTintColor="#FFFFFF"
          />
        </View>
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
              marginLeft = 70;
            } else if (index === 0 || index === 2 * numCols) {
              marginLeft = 40;
            }
            if (index === numCols - 1 || index === 2 * numCols - 1 || index === 3 * numCols - 1 || index === 4 * numCols - 1) {
              marginRight = 40;
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
    width: 90,
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
    width: 90,
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

export default SettingsScreen;