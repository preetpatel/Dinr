import React, { useState } from "react";
import { View, TouchableOpacity, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import Cuisine from "@config/Cuisines";

interface CuisineGridProps {
  cuisines: Cuisine[],
  selectedCuisine: Cuisine | undefined,
  onCuisinePress: (cuisine: Cuisine) => void,
}

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
              marginLeft = 10;
            } else if (index === 0 || index === 2 * numCols) {
              marginLeft = 40;
            }
            if (index === numCols - 1 || index === 2 * numCols - 1 || index === 3 * numCols - 1 || index === 4 * numCols - 1) {
              marginRight = 10;
            } else if (index === 2 * numCols - 1 || index === 4 * numCols - 1) {
              marginRight = 40;
            }

            return (
              <TouchableOpacity
                key={item.id}
                style={[item.selected ? styles.cuisineSelected : styles.cuisineUnselected, {marginLeft: marginLeft, marginRight: marginRight}]}
                onPress={() => props.onCuisinePress(item)}
                disabled={props.selectedCuisine && props.selectedCuisine.id !== item.id}
              >
                <Text style={item.selected ? styles.selectedCuisineText : styles.unselectedCuisineText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  unselectedCuisineText: {
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
    width: 120,
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
    width: 120,
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
});

export default CuisinesGrid;