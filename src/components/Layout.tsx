import { ReactNode } from "react";
import { SafeAreaView, StyleProp, ViewProps, ViewStyle } from "react-native";

const style: StyleProp<ViewStyle> = {
  flex: 1,
  backgroundColor: "transparent",
};

interface Props extends ViewProps {
  children: ReactNode;
  safeAreaView?: boolean;
}

export default function Layout({ children, ...rest }: Props) {
  return (
    <SafeAreaView style={style} {...rest}>
      {children}
    </SafeAreaView>
  );
}
