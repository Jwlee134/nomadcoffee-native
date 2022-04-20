import { ReactNode } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
`;

interface Props extends ViewProps {
  children: ReactNode;
}

export default function Layout({ children, ...rest }: Props) {
  return <Container {...rest}>{children}</Container>;
}
