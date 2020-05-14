import {Image, StyleSheet, View, Text} from "react-native";
import React from "react";

export type LocationSymbolParams = {
    readonly distanceInKM: number;
};

export const LocationSymbol: React.FC<LocationSymbolParams> = (props) => {
    const distance = props.distanceInKM;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../images/locationTag.png")}/>
            <Text style={styles.text}>{distance}km</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        flexDirection: "row",
        marginLeft: 30,
    },
    text: {
        fontFamily: "SFProText-Medium",
        fontSize: 14,
        color: "white",
    },
    image: {
        marginRight: 4,
    }
});
