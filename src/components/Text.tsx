import { ReactNode } from "react";
import { TextProps } from "react-native";
import styled from "styled-components/native";

const MyText = styled.Text`
  color: white;
`;

interface Props extends TextProps {
  children: string | number | ReactNode;
}

export default function Text({ children, ...rest }: Props) {
  return <MyText {...rest}>{children}</MyText>;
}
