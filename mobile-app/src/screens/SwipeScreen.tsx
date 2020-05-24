import React, {useEffect, useRef, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@navigation/hooks/useNavigation";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// @ts-ignore
import Swiper from "react-native-deck-swiper";
import {Card} from "@components/Card";

export type SwipeScreenNavigationParams = {
  readonly timer: number;
  readonly restaurantData: unknown;
};

export const SwipeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState();
  const [restaurantData, setRestaurantData] = useState();
  const [hasUsedSuperLike, setHasUsedSuperLike] = useState(false);
  const swipeComponent = useRef<Swiper>();
  const DEFAULT_IMAGE: string = "https://media-cdn.tripadvisor.com/media/photo-s/0e/cc/0a/dc/restaurant-chocolat.jpg"
  /**
   * Timer hook to count down and navigate
   */
  useEffect( () => {
    const interval = setInterval(() => {
      setTime((time: number) => {
        const newTime = time - 1;
        if (newTime == 0) {
          navigation.navigate("TimesUpScreen") // TODO Called when timer is over.. navigates to next screen
          return;
        } else {
          return newTime;
        }
      })
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    const time = navigation.getParam("timer");
    // @ts-ignore
    const restaurantData = navigation.getParam("restaurantData");
    // @ts-ignore
    setTime(time);
    setRestaurantData(restaurantData)
  }, [navigation]);

  const handleOnComplete = () => {
    console.log("Swiping over. Redirecting back to home screen for now");
    navigation.navigate("TimesUpScreen");
  }

  const handleSuperLike = (cardIndex: number) => {
    setHasUsedSuperLike(true);
    console.log(cardIndex + " Super liked! This can only be done once and has now been disabled")
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
            ref={(swiper: any) => {swipeComponent.current = swiper}}
          cards={restaurantData}
          renderCard={(card: { name: string; image: string; rating: { ratingNumber: number }; priceRange: number; distance: number; address: string; }) => {
            return (
                <Card name={card.name} imageURI={card.image !== "" ? card.image : DEFAULT_IMAGE} stars={card.rating} price={card.priceRange} distance={card.distance} address={card.address}/>
            )
          }}
          onSwipedLeft={(cardIndex: number) => {console.log(cardIndex + " swiped Left")}}
          onSwipedRight={(cardIndex: number) => {console.log(cardIndex + " swiped Right")}}
          onSwipedTop={(cardIndex: number) => {handleSuperLike(cardIndex)}}
          disableBottomSwipe={true}
            disableTopSwipe={hasUsedSuperLike} // Cannot superLike more than one restaurant
          onSwipedAll={handleOnComplete} // TODO Redirect to next page
          backgroundColor={'rgba(0,0,0,0)'}
          cardIndex={0}
          overlayLabels={overlayStyles}
          animateCardOpacity={true}
            marginTop={-20}
          stackSize= {3}>
      </Swiper> }
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => swipeComponent.current.swipeLeft()}>
          <Image style={[styles.buttonImage, styles.pushImage]} source={require("../images/dislike.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => hasUsedSuperLike ? {} : swipeComponent.current.swipeTop()}>
          <Image style={hasUsedSuperLike? [styles.buttonImage, styles.buttonDisabled] : styles.buttonImage} source={require("../images/superlike.png")}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeComponent.current.swipeRight()}>
          <Image style={[styles.buttonImage, styles.pushImage]} source={require("../images/like.png")}/>
        </TouchableOpacity>

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
    paddingTop: hp('4%'),
  },
  header: {
    paddingTop: hp('0.5%'),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp('10%'),
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
    paddingLeft: wp('2%'),
  },
  timer: {
    marginTop: hp('1.5%'),
    flexDirection: "row",
  },
  footer: {
    padding: wp('5%'),
    paddingHorizontal: wp('12%'),
    justifyContent: "space-between",
    flexDirection: "row"
  },
  pushImage: {
    marginTop: hp('2%'),
  },
  buttonImage: {
    width: wp('17%'),
    height: hp('9%'),
  },
  buttonDisabled: {
    tintColor: "grey"
  }
});

const overlayStyles = {
  left: {
    title: 'NOPE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: hp('4%'),
        marginLeft: hp('-4%')
      }
    }
  },
  right: {
    title: 'LIKE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: hp('4%'),
        marginLeft: hp('4%')
      }
    }
  },
  top: {
    title: 'SUPER LIKE',
    style: {
      label: {
        backgroundColor: 'black',
        borderColor: 'black',
        color: 'white',
        borderWidth: 1
      },
      wrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
  }
}
