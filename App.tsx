import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import TabsNav from "./src/navigators/TabsNav";
import { ApolloProvider } from "@apollo/client";
import client from "./src/apollo";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { navigatorTheme } from "./src/styles/theme";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { TOKEN, tokenVar } from "./src/apollo/vars";

export default function App() {
  const [loaded] = useFonts(Ionicons.font);
  const [assets] = useAssets([require("./assets/coffee.jpg")]);
  const [isReady, setIsReady] = useState(false);
  const { getItem } = useAsyncStorage(TOKEN);

  useEffect(() => {
    (async () => {
      const token = await getItem();
      if (token) {
        tokenVar(token);
      }
      setIsReady(true);
    })();
  }, []);

  if (!loaded || !assets || !isReady) return <AppLoading />;
  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={navigatorTheme}>
        <StatusBar style="light" />
        <ImageBackground
          style={StyleSheet.absoluteFill}
          source={require("./assets/coffee.jpg")}
          resizeMode="cover"
        />
        <BlurView style={{ flex: 1 }} intensity={40} tint="dark">
          <TabsNav />
        </BlurView>
      </NavigationContainer>
    </ApolloProvider>
  );
}
