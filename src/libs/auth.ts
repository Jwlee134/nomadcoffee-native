import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN, tokenVar } from "../apollo/vars";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  tokenVar("");
};
