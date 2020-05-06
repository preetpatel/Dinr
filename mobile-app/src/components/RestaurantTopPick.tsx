import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";

export const RestaurantTopPick: React.FC = () => {

    const  viewMorePress = () => {
        // TODO: Add change screen functionality here
    }

    return (
        <View style={styles.restaurantContainer}>
            <View style={styles.restaurantInfoContainer}>
                <Image style={styles.restaurantImage} source={require("../images/salad-plates.png")}></Image>
                <View style={styles.restaurantTextContainer}>
                    <Text style={styles.restaurantNameText}>Name of place</Text>
                     <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                         <Image style={styles.locationIcon} source={require("../images/location-icon.png")}></Image>
                         <Text style={styles.restaurantDistanceText}>1.2km away</Text>
                     </View>
                     <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                         <Image style={styles.priceIcon} source={require("../images/ic_monetization_on_24px.png")}></Image>
                         <Image source={require("../images/ic_monetization_on_24px.png")}></Image>
                     </View>
                </View>
                <TouchableOpacity onPress={viewMorePress}>
                    <Image style={styles.viewMoreButton} source={require("../images/green-forward-arrow.png")}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>

    );
}


const styles = StyleSheet.create({
    restaurantContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
    },
    restaurantInfoContainer: {
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
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 5
    },
    restaurantTextContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#EEEEEE",
        height: 60,
        width: 230
    },
    restaurantNameText: {
        fontFamily: "SFProDisplay-Bold",
        fontWeight: "bold",
        fontSize: 15,
        color: "#29732D",
        lineHeight: 25
    },
    locationIcon: {
        marginRight: 5
    },
    restaurantDistanceText: {
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
    line: {
        backgroundColor: '#E1E1E1',
        height: 1,
        width: "100%"
    },

});