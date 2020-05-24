import * as R from "ramda";
import { SwipeScreenNavigationParams } from "@screens/SwipeScreen";
import {WaitingScreenNavigationParams} from "@screens/WaitingScreen";
import {ReadyScreenNavigationParams} from "@screens/ReadyScreen";
import {TimesUpScreenNavigationParams} from "@screens/TimesUpScreen";
import {ResultsScreenNavigationParams} from "@screens/ResultsScreen";

type RouteDefinition = {
  readonly title: string;
  readonly icon?: string;
  readonly headerShown?: boolean;
};

export type RouteName =
   "HomeScreen"
  | "SwipeScreen"
  | "ReadyScreen"
  | "ResultsScreen"
  | "TimesUpScreen"
  | "WaitingScreen"
  | "SetupSessionScreen";

type Routes = {
  readonly [Name in RouteName]: RouteDefinition;
};

export const Routes: Routes = {
  HomeScreen: {
    title: "Home",
    headerShown: false,
  },
  SwipeScreen: {
    title: "Swipe Screen",
    headerShown: false,
  },
  ReadyScreen: {
    title: "Ready Screen",
    headerShown: false,
  },
  ResultsScreen: {
    title: "Results Screen",
    headerShown: false,
  },
  TimesUpScreen: {
    title: "Times Up Screen",
    headerShown: false,
  },
  WaitingScreen: {
    title: "Waiting Screen",
    headerShown: false,
  },
  SetupSessionScreen: {
    title: "Setup Session Screen",
    headerShown: false,
  }
};
/**
 * Maps a RouteName to a Navigation Param type
 */
export type NavigationParamsMap = {
  readonly SwipeScreen: SwipeScreenNavigationParams;
  readonly WaitingScreen: WaitingScreenNavigationParams;
  readonly ReadyScreen: ReadyScreenNavigationParams;
  readonly TimesUpScreen: TimesUpScreenNavigationParams;
  readonly ResultsScreen: ResultsScreenNavigationParams;
};

export const getRouteIcon = (route: string): string | undefined => R.path([route, "icon"], Routes);
export const getRouteTitle = (route: string): string | undefined => R.path([route, "title"], Routes);
export const getRouteHeaderShown = (route: string): boolean | undefined =>
  R.path<boolean>([route, "headerShown"], Routes) || false;
