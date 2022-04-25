import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet } from "react-native";
import useMe from "../hooks/useMe";
import { TabsNavParamList } from "../types/navigator";

const Tab = createBottomTabNavigator<TabsNavParamList>();

export default function TabsNav() {
  const me = useMe();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "rgba(255, 255, 255, 0.5)",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.5)",
        tabBarShowLabel: false,
        headerStyle: { backgroundColor: "transparent" },
        headerTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerTitle: "Nomad Coffee",
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            me ? (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  ...(focused && {
                    borderWidth: 2,
                    borderColor: "white",
                  }),
                }}
                source={{ uri: me.avatarUrl! }}
              />
            ) : (
              <Ionicons name="person" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
