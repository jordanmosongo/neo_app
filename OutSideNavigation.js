const { createNavigationContainerRef } = require("@react-navigation/native");

export const navigationRef = createNavigationContainerRef();

export const navigateWithoutParamsToScreen = (screen) => {
  if (navigationRef?.isReady()) {
    navigationRef.navigate(screen);
  }
}