import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import LinearGradient from 'react-native-linear-gradient';
import Swiper from "react-native-deck-swiper";
import {ReviewStars} from "@components/ReviewStars";
import {PriceSymbols} from "@components/PriceSymbol";
import {LocationSymbol} from "@components/LocationSymbol";

export type SwipeScreenNavigationParams = {
  readonly timer: number;
  readonly restaurantData: unknown;
};

export const SwipeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(90);
  const [foodPictures, setFoodPictures] = useState();

  useEffect(() => {
    // @ts-ignore
    const time = navigation.getParam("timer");
    setTime(time);
    setFoodPictures([
      { id: "1", uri: require('../images/food1.jpg'), restaurantName: "Paradise", stars: 2, price: 3, distance: 1.3, quote: "Something about the indian food just makes my mouth drool" },
      { id: "2", uri: require('../images/food2.jpg'), restaurantName: "Sals Pizza", stars: 3, price: 4, distance: 1.6, quote: "You can never beat the pizza that Sals makes! 100% recommend" },
      { id: "3", uri: require('../images/food3.jpg'), restaurantName: "Bonna Pizzeria", stars: 1, price: 2, distance: 0.3, quote: "Not the greatest pizza tbh... too oily" },
      { id: "4", uri: require('../images/food4.jpg'), restaurantName: "Kati Grill", stars: 4, price: 4, distance: 2.4, quote: "Yummy wraps! Wish they were a bit closer to me" },
      { id: "5", uri: require('../images/food5.jpg'), restaurantName: "Portofino", stars: 5, price: 5, distance: 1, quote: "Amazing views.. super friendly staff who serve you well" },
    ])
  }, [navigation])

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.dinrLogoText}>Dinr</Text>
        <View style={styles.timer}>
          <Image source={require("../images/timer.png")} />
          <Text style={styles.timerText}>{time} sec</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        {foodPictures && <Swiper
          cards={foodPictures}
          renderCard={(card) => {
            return (
                <View style={styles.card}>
                  <Image style={styles.cardImage} source={card.uri}/>
                  <LinearGradient colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.55)"]} style={styles.imageOverlay} />
                  <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{card.restaurantName}</Text>
                    <View style={styles.restaurantReview}>
                    <ReviewStars count={card.stars}/>
                    <PriceSymbols count={card.price}/>
                    <LocationSymbol distanceInKM={card.distance}/>
                    </View>
                    <Text numberOfLines={2} style={styles.restaurantQuote}>{card.quote}</Text>
                  </View>
                </View>
            )
          }}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          backgroundColor={'#EEEEEE'}
          cardIndex={0}
          containerStyle={styles.mainContainer}
          stackSize= {5}>
      </Swiper> }
      </View>
      <View style={styles.footer}>
        <Image style={[styles.buttonImage, styles.pushImage]} source={require("../images/dislike.png")}/>
        <Image style={styles.buttonImage} source={require("../images/superlike.png")}/>
        <Image style={[styles.buttonImage, styles.pushImage]} source={require("../images/like.png")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "stretch",
    backgroundColor: "#EEEEEE",
    paddingTop: 40,
  },
  header: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  dinrLogoText: {
    color: "#29732D",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 34,
  },
  timerText: {
    color: "#29732D",
    fontFamily: "SFProDisplay-Bold",
    fontSize: 24,
    paddingLeft: 8,
  },
  timer: {
    marginTop:10,
    flexDirection: "row",
  },
  card: {
    flex: 0.75,
    borderRadius: 32,
    borderColor: "#E8E8E8",
    shadowRadius: 25,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 0},
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: Dimensions.get("window").height /3,
  },
  cardImage: {
    flex: 1,
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
    borderRadius: 32,
    zIndex: -10,
    position: "relative",
  },
  imageOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },
  footer: {
    padding: 60,
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: -10
  },
  pushImage: {
    marginTop: 15,
  },
  buttonImage: {
    width: 60,
    height: 60,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: "flex-end",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    padding: 40,
  },
  restaurantName: {
    fontFamily: "SFProText-Bold",
    fontSize: 22,
    color: "white",
  },
  restaurantReview: {
    flexDirection: "row",
  },
  restaurantQuote: {
    fontFamily: "SFProText-Medium",
    fontSize: 12,
    color: "white",
  },

});
