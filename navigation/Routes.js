import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// import bottom tabs
import BottomTabs from "./BottomTabs";

const Routes = () => {
  let routeName = "Home";

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Routes;
