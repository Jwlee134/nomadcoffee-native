import { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

interface Props {
  children: ReactNode;
}

export default function DismissKeyboard({ children }: Props) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
}
