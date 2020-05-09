import { useContext } from "react";

import { NavigationContext, NavigationScreenProp, NavigationAction } from "react-navigation";

import { RouteName, NavigationParamsMap } from "../routes";

/**
 * Gets the mapping from RouteName to Navigation Params
 * if there is no mapping the param is void
 */
export type NavigationParam<T extends RouteName> = T extends keyof NavigationParamsMap ? NavigationParamsMap[T] : void;

/**
 * Navigated to the route, params must match the routeName based on ParamMap
 */
type Navigate<Name extends RouteName> = (
  routeName: Name,
  params: NavigationParam<Name>,
  action?: NavigationAction
) => boolean;

/**
 * Uses `interface` instead of `type` to extend and override navigate instead of creating a new union
 */
// eslint-disable-next-line functional/prefer-type-literal
interface Navigation<RouteParams = void> extends Omit<NavigationScreenProp<{}, RouteParams>, "navigate"> {
  readonly navigate: Navigate<RouteName>;
}

/**
 * Do not use this call outside of the hooks package. use the useNavigate() hook.
 */
export function useNavigation<RouteParams>(): Navigation<RouteParams> {
  /**
   * This is a bit for working against the language
   * to make sure the correct type of routeParams are used for the routeName
   */
  return (useContext(NavigationContext) as unknown) as Navigation<RouteParams>;
}
