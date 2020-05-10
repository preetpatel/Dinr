import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { NavigationRoute, NavigationParams } from "react-navigation";

import { getRouteTitle, getRouteHeaderShown } from "@navigation/routes";

export const getDefaultNavigationOptions = (
  navigation: NavigationStackProp<NavigationRoute<NavigationParams>, any>
): NavigationStackOptions => {
  const currentRouteName = navigation.state.routes
    ? navigation.state.routes[navigation.state.index].routeName
    : navigation.state.routeName || "";
  const routeTitle = getRouteTitle(currentRouteName);
  return {
    title: routeTitle,
    headerShown: getRouteHeaderShown(currentRouteName),
  };
};
