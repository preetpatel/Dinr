import {Dimensions, Image, ImageProps, StyleSheet, Text, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {ReviewStars} from "@components/ReviewStars";
import {PriceSymbols} from "@components/PriceSymbol";
import {LocationSymbol} from "@components/LocationSymbol";
import React from "react";

export type CardParams = {
    readonly name: string;
    readonly imageURI: ImageProps;
    readonly stars: number;
    readonly price: number;
    readonly distance: number;
    readonly quote: string;
};

export const Card: React.FC<CardParams> = (props) => {
    return (
        <View style={styles.card}>
            <Image style={styles.cardImage} source={props.imageURI}/>
            <LinearGradient colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.55)"]} style={styles.imageOverlay} />
            <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{props.name}</Text>
                <View style={styles.restaurantReview}>
                    <ReviewStars count={props.stars}/>
                    <PriceSymbols count={props.price}/>
                    <LocationSymbol distanceInKM={props.distance}/>
                </View>
                <Text numberOfLines={2} style={styles.restaurantQuote}>{props.quote}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
