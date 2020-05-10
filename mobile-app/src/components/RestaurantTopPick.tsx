import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";

export const RestaurantTopPick: React.FC = () => {
    const restaurantData = { name: "Paradise", price: 3, disatance: 1.2, image: "../images/salad-plates.png"}
    const [restaurant, setRestaurant] = useState(restaurantData);

    const  viewMorePress = () => {
        // TODO: Add change screen functionality here
    }

    let priceRows = [];
    for (let i=0; i < restaurant.price; i++) {
        priceRows.push(<Image key={i} style={styles.priceIcon} source={require("../images/ic_monetization_on_24px.png")}></Image>)
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.restaurantContainer}>
                <Image style={styles.restaurantImage} source={require("../images/salad-plates.png")}></Image>
                <View style={styles.restaurantInfoContainer}>
                    <Text style={styles.nameText}> {restaurant.name} </Text>
                     <View style={styles.locationInfoContainer}>
                         <Image style={styles.locationIcon} source={require("../images/location-icon.png")}></Image>
                         <Text style={styles.distanceText}> {restaurant.disatance} km away</Text>
                     </View>
                     <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                       {priceRows}
                     </View>
                </View>
                <TouchableOpacity onPress={viewMorePress}>
                    <Image style={styles.viewMoreButton} source={require("../images/green-forward-arrow.png")}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.lineSeparator}></View>
        </View>

    );
}


const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
    },
    restaurantContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
        marginBottom: 12,
        alignItems: "center"
    },
    restaurantImage: {
        height: 57,
        width: 57,
        borderColor: "#29732D",
        borderWidth: 1,
        borderRadius: 5
    },
    restaurantInfoContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
        height: 50,
        width: 230
    },
    nameText: {
        fontFamily: "SFProDisplay-Bold",
        fontWeight: "bold",
        fontSize: 15,
        color: "#29732D",
        lineHeight: 25
    },
    locationInfoContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        marginBottom: 4
    },
    locationIcon: {
        marginRight: 5
    },
    distanceText: {
        fontFamily: "SFProDisplay-Bold",
        fontSize: 12,
        color: "#29732D",
    },
    priceIcon: {
        marginRight: 3
    },
    viewMoreButton: {
        alignSelf: "flex-end"
    },
    lineSeparator: {
        backgroundColor: '#E1E1E1',
        height: 1,
        width: "100%"
    },

});