import {Text, StyleSheet, View} from "react-native";
import React from "react";

export type PriceSymbolParams = {
    readonly count: number;
};

export const PriceSymbols: React.FC<PriceSymbolParams> = (props) => {
    const price = props.count;
    return (
        <View style={styles.container}>
            <Text style={price < 1? [{display: "none"}, styles.text] : styles.text}>$</Text>
            <Text style={price < 2? [{display: "none"}, styles.text] : styles.text}>$</Text>
            <Text style={price < 3? [{display: "none"}, styles.text] : styles.text}>$</Text>
            <Text style={price < 4? [{display: "none"}, styles.text] : styles.text}>$</Text>
            <Text style={price < 5? [{display: "none"}, styles.text] : styles.text}>$</Text>

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
        fontFamily: "SFProText-Bold",
        fontSize: 14,
        color: "white",
    }
});
