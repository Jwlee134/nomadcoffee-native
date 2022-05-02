import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TakePhoto from "../screens/TakePhoto";
import { SelectPhotoTopTabNavParamList } from "../types/navigator";
import SelectPhotoStackNav from "./SelectPhotoStackNav";

const TopTab = createMaterialTopTabNavigator<SelectPhotoTopTabNavParamList>();

export default function SelectPhotoTopTabNav() {
  const { bottom } = useSafeAreaInsets();

  return (
    <TopTab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          paddingBottom: bottom,
          backgroundColor: "black",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "rgba(255, 255, 255, 0.5)",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { display: "none" },
      }}
    >
      <TopTab.Screen
        options={{ title: "Select" }}
        name="SelectPhotoStackNav"
        component={SelectPhotoStackNav}
      />
      <TopTab.Screen
        options={{ title: "Take" }}
        name="TakePhoto"
        component={TakePhoto}
      />
    </TopTab.Navigator>
  );
}
