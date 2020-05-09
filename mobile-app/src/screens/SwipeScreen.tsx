import React, {useEffect, useState} from "react";
import { Image, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import Swiper from "react-native-deck-swiper";
import {Card} from "@components/Card";

export type SwipeScreenNavigationParams = {
  readonly timer: number;
  readonly restaurantData: unknown;
  readonly numberOfRestaurants: number;
};

export const SwipeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(90);
  const [restaurantData, setRestaurantData] = useState();
  const [numberOfRestaurants, setNumberOfRestaurants] = useState();

  useEffect(() => {
    // @ts-ignore
    const time = navigation.getParam("timer");
    // @ts-ignore
    const restaurantData = navigation.getParam("restaurantData");
    // @ts-ignore
    const numberRestaurants = navigation.getParam("numberOfRestaurants");
    setTime(time);
    setNumberOfRestaurants(numberRestaurants);
    setRestaurantData(restaurantData)
  }, [navigation]);

  const handleOnComplete = () => {
    console.log("Swiping over. Redirecting back to home screen for now");
    navigation.navigate("HomeScreen");
  }

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
        {restaurantData &&
        <Swiper
          cards={restaurantData}
          renderCard={(card) => {
            return (
                <Card name={card.restaurantName} imageURI={card.uri} stars={card.stars} price={card.price} distance={card.distance} quote={card.quote}/>
            )
          }}
          onSwipedLeft={(cardIndex) => {console.log(cardIndex + " swiped Left")}}
          onSwipedRight={(cardIndex) => {console.log(cardIndex + " swiped Right")}}
          onSwipedTop={(cardIndex) => {console.log(cardIndex + " Super liked!")}}
          onSwipedBottom={(cardIndex) => {console.log(cardIndex + " swiped Left")}} // Treat bottom swipe as a dislike
          onSwipedAll={handleOnComplete} // TODO Redirect to next page
          backgroundColor={'#EEEEEE'}
          cardIndex={0}
          containerStyle={styles.mainContainer}
          stackSize= {numberOfRestaurants}>
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
});
