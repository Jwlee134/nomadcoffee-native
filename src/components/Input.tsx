import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { StyleSheet, TextInputProps } from "react-native";
import styled from "styled-components/native";
import Text from "./Text";

const SInput = styled.TextInput`
  height: 40px;
  background-color: transparent;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: rgba(255, 255, 255, 0.5);
  padding: 0 10px;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
`;

interface Props<T> extends TextInputProps {
  control: Control<T, any>;
  name: Path<T>;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function Input<T extends FieldValues>({
  control,
  name,
  rules,
  ...props
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        formState: { errors },
      }) => (
        <>
          <SInput
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            {...props}
          />
          {errors[name]?.message ? (
            <Text
              style={{
                marginLeft: 5,
                marginBottom: 10,
                color: "tomato",
                fontSize: 12,
              }}
            >
              {errors[name].message}
            </Text>
          ) : null}
        </>
      )}
    />
  );
}
