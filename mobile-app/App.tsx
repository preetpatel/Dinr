import React, { useEffect } from "react";
import { HomeScreen } from "@screens/HomeScreen";
import SplashScreen from "react-native-splash-screen";
import { TimesUpScreen } from "@screens/TimesUpScreen"
import { WaitingScreen } from "@screens/WaitingScreen";
import { ResultsScreen } from "@screens/ResultsScreen"

export default function App() {
  useEffect(() => { SplashScreen.hide(); }, []);
  return <ResultsScreen />;
}
