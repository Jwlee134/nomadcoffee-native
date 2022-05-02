import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UploadForm from "../screens/UploadForm";
import { UploadNavParamList } from "../types/navigator";
import SelectPhotoTopTabNav from "./SelectPhotoTopTabNav";

const Stack = createNativeStackNavigator<UploadNavParamList>();

export default function UploadNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectPhotoTopTabNav"
        component={SelectPhotoTopTabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
