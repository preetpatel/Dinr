import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import {AuthSwitchNavigator} from "@navigation/AuthSwitchNavigator";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            ["Auth"]: AuthSwitchNavigator,
        },
        {
            initialRouteName: "Auth",
        }
    )
);

export default function App() {

  useEffect(() => { SplashScreen.hide(); }, []);
  return (
        <AppContainer/>
  )
}
