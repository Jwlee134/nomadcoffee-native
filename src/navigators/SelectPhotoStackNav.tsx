import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SelectPhoto from "../screens/SelectPhoto";

const Stack = createNativeStackNavigator();

export default function SelectPhotoStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        headerTitle: "Select A Photo",
      }}
    >
      <Stack.Screen name="SelectPhoto" component={SelectPhoto} />
    </Stack.Navigator>
  );
}
