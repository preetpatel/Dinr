import React, { useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Linking } from "react-native";

export const RestaurantTopPick: React.FC = () => {
	const restaurantData = { name: "Paradise", price: 3, disatance: 1.2, image: "../images/salad-plates.png", address: "591 Sandringham Road, Sandringham, Auckland 1025"}
	const [restaurant, setRestaurant] = useState(restaurantData);

	const  seeLocation = (name: string, address: string) => {
		const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
		console.log(url);
		Linking.canOpenURL(url).then(supported => {
				if (supported) {
					Linking.openURL(url);
				} else {
					console.log("Don't know how to open URI: " + url);
				}
			});    
	}

	let priceRows = [];
	for (let i=0; i < restaurant.price; i++) {
			priceRows.push(<Image key={i} style={styles.priceIcon} source={require("../images/ic_monetization_on_24px.png")}></Image>)
	}
	return (
		<View style={styles.mainContainer}>
			<View style={styles.restaurantContainer}>
				<View style={{ flexDirection: "row" }}>
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
				</View>
				<TouchableOpacity onPress={() => seeLocation(restaurant.name, restaurant.address)}>
						<Image style={styles.viewMoreButton} source={require("../images/green-forward-arrow.png")}></Image>
				</TouchableOpacity>
			</View>
			<View style={styles.lineSeparator}/>
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
		marginLeft: 10,
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
		margin: 15,
	},
	lineSeparator: {
		backgroundColor: '#E1E1E1',
		height: 1,
		width: "100%"
	},
});