import {Image, StyleSheet, View} from "react-native";
import React from "react";

export type ReviewStarsParams = {
    readonly count: number;
};

export const ReviewStars: React.FC<ReviewStarsParams> = (props) => {
    const stars = props.count;
    return (
        <View style={styles.container}>
            <Image source={require("../images/star.png")} style={stars < 1? {display: "none"}: {}}/>
            <Image source={require("../images/star.png")} style={stars < 2? {display: "none"}: {}}/>
            <Image source={require("../images/star.png")} style={stars < 3? {display: "none"}: {}}/>
            <Image source={require("../images/star.png")} style={stars < 4? {display: "none"}: {}}/>
            <Image source={require("../images/star.png")} style={stars < 5? {display: "none"}: {}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 2,
        flexDirection: "row"
    }
});
