import React, {useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground} from "react-native";

export const WaitingScreen: React.FC = () => {
  const [isHost, setHost ] = useState(true);
  const [friendsJoined, setFriendsJoined ] = useState(3);
  const [ joinCode, changeJoinCode ] = useState("ABC124");

  const backPress = () => {
    // TODO: Add change screen functionality here
  }

  const beginMatchingPress = () => {
    // TODO: Add change screen functionality here
  }

  return (
    <View style={styles.mainContainer}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={backPress}>
              <Image style={styles.backButton} source={require("../images/ic_arrow_back_24px.png")}></Image>
            </TouchableOpacity>

            { isHost ? <Text style={styles.headerText}>Hosting Session</Text> : <Text style={styles.headerText}>Joined Session</Text> }
            <Text style={styles.empty}></Text>
          </View>

          <View>
            <View>
              <ImageBackground style={styles.logoImage} source={require("../images/logo-bowl.png")}>
                <Text style={styles.friendsJoinedText}>{friendsJoined}</Text>
              </ImageBackground>
            </View>
            <Text style={styles.bodyText}>friends have joined</Text>
          </View>

          <View>
            <Text style={styles.codeText}>{joinCode}</Text>
            <Text style={styles.bodyText}>Share this code with your friends</Text>
          </View>

          <View style={{marginBottom: 20}}>
            { isHost ? <Text style={styles.bodyText}>And once everyone has joined</Text> : null }
            <TouchableOpacity style={isHost ? styles.beginButton : styles.waitingButton} onPress={beginMatchingPress} disabled={!isHost}>
              <Text style={isHost ? styles.beginButtonText : styles.waitingButtonText}>
                { isHost ? "Begin Matching" : "Waiting on host..." } 
                </Text>
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
    backgroundColor: "#006607",
    padding: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 25,
    color: "#FFFFFF",
  },
  backButton: {
    alignSelf: "flex-start"
  },
  empty: {
  },
  friendsJoinedText: {
    position: "absolute",
    bottom: 7,
    fontFamily: "SFProDisplay-Bold",
    fontSize: 32,
    color: "#FFFFFF",
  },
  logoImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  codeText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 20,
  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  beginButton: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    width: 228,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  beginButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#006607",
  },
  waitingButton: {
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 45,
    width: 228,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  waitingButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#FFFFFF",
  }
});
