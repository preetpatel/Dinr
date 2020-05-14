import React, { useEffect } from "react";
import { HomeScreen } from "@screens/HomeScreen";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => { SplashScreen.hide(); }, []);
  return <HomeScreen />;
}
