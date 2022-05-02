import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootNavParamList } from "../types/navigator";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator<RootNavParamList>();

export default function RootNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="TabsNav" component={TabsNav} />
      <Stack.Screen name="UploadNav" component={UploadNav} />
    </Stack.Navigator>
  );
}
