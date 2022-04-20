import { TouchableHighlightProps } from "react-native";
import styled from "styled-components/native";
import Text from "./Text";

const Btn = styled.TouchableHighlight`
  height: 40px;
  background-color: #6f4e37;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

interface Props extends TouchableHighlightProps {
  title: string;
}

export default function Button({ title, ...rest }: Props) {
  return (
    <Btn underlayColor="#5a402e" {...rest}>
      <Text style={{ fontWeight: "600" }}>{title}</Text>
    </Btn>
  );
}
