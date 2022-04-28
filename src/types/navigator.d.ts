import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type TabsNavParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

export type ProfileScreenProps = BottomTabScreenProps<
  TabsNavParamList,
  "Profile"
>;

export type SearchScreenProps = BottomTabScreenProps<
  TabsNavParamList,
  "Search"
>;
