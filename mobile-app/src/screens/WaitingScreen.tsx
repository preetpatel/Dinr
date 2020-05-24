import React, {useEffect, useState} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity} from "react-native";
import { useNavigation } from "@navigation/hooks/useNavigation";
import {getFriendsJoinedCount, getInteractionStatus, startInteraction} from "../api/api";

export type WaitingScreenNavigationParams = {
  readonly isHost: boolean;
  readonly code: string;
};

export const WaitingScreen: React.FC = () => {
  const navigation = useNavigation();
  // @ts-ignore
  const [isHost, setHost ] = useState(navigation.getParam('isHost'));
  const [friendsJoined, setFriendsJoined ] = useState(0);
  // @ts-ignore
  const [ joinCode, changeJoinCode ] = useState(navigation.getParam("code"));

  const intervalID = setInterval(async () => {
    const count = await getFriendsJoinedCount(joinCode);
    await setFriendsJoined(count -1);
  }, 1000)

  useEffect(() => {
    let intID = setInterval(async () => {
      if (!isHost) {
        if (await getInteractionStatus(joinCode) === true) {
          await beginMatchingPress();
        }
      }
    }, 500);
    return() => {
      clearInterval(intID);
    }
  });

  const beginMatchingPress = async () => {
    clearInterval(intervalID)
    if(isHost) {
      await startInteraction(joinCode);
    }
    navigation.navigate("ReadyScreen", {code: joinCode});
  }

  return (
    <View style={styles.mainContainer}>
        <View style={{ flex: 1.2, justifyContent: "space-between"}}>
          <View style={styles.header}>
            { isHost ? <Text style={styles.headerText}>Hosting Session</Text> : <Text style={styles.headerText}>Joined Session</Text> }
          </View>

          <View>
            <Text style={styles.codeText}>{friendsJoined}</Text>
            <Text style={styles.bodyText}>friends have joined</Text>
          </View>
          <View>
            <Text style={styles.codeText}>{joinCode}</Text>
            <Text style={styles.bodyText}>Share this code with your friends</Text>
          </View>
        </View>


        <View style={{ flex: 1, justifyContent: "flex-end"}}>
          { isHost ? <Text style={styles.bodyText}>And once everyone has joined</Text> : <View style={{ height: 28}}/> }
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
    padding: 40,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 20,
    color: "#FFFFFF",
    textAlign:"center"
  },
  backButton: {
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },
  codeText: {
    fontFamily: "SFProDisplay-Bold",
    fontWeight: "bold",
    fontSize: 60,
    textAlign: "center",
    color: "#FFFFFF",
  },
  bodyText: {
    fontFamily: "SFProDisplay-Bold",
    fontSize: 15,
    textAlign: "center",
    color: "#FFFFFF",
  },
  beginButton: {
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  beginButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#006607",
  },
  waitingButton: {
    marginTop: 10,
    borderRadius: 15,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch"
  },
  waitingButtonText: {
    fontFamily: "SFProDisplay-Medium",
    fontSize: 20,
    color: "#FFFFFF",
  }
});
