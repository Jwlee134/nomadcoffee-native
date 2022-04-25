import { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard, StyleProp, TextStyle, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useCreateAccountMutation,
  useLoginMutation,
} from "../graphql/generated";
import { logUserIn } from "../libs/auth";
import Button from "./Button";
import Input from "./Input";
import Text from "./Text";
import Layout from "./Layout";

const ToggleContainer = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  flex-direction: row;
`;

const toggleTextStyle: StyleProp<TextStyle> = {
  color: "rgba(255, 255, 255, 0.8)",
};

interface Form {
  username: string;
  password: string;
  email: string;
  name: string;
  error?: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [login] = useLoginMutation({
    onCompleted: async ({ login }) => {
      if (!login?.token) return;
      await logUserIn(login.token);
    },
  });
  const [createAccount] = useCreateAccountMutation({
    onCompleted: async ({ createAccount }) => {
      if (!createAccount?.token) return;
      await logUserIn(createAccount.token);
    },
  });
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      error: "",
    },
  });

  const onValid = (data: Form) => {
    Keyboard.dismiss();
    if (isLogin) {
      login({
        variables: { username: data.username, password: data.password },
      });
    } else {
      createAccount({ variables: data });
    }
  };

  return (
    <Layout safeAreaView>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 40,
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Input
          control={control}
          name="username"
          rules={{ required: "Username is required." }}
          placeholder="Username"
          returnKeyType="next"
          autoCapitalize="none"
        />
        {!isLogin ? (
          <>
            <Input
              control={control}
              name="email"
              rules={{ required: "Email is required." }}
              placeholder="Email"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              control={control}
              name="name"
              rules={{ required: "Name is required." }}
              placeholder="Name"
              returnKeyType="next"
            />
          </>
        ) : null}
        <Input
          control={control}
          name="password"
          rules={{ required: "Password is required." }}
          placeholder="Password"
          returnKeyType="done"
          secureTextEntry
        />
        <Button
          onPress={handleSubmit(onValid)}
          title={isLogin ? "Login" : "Sign Up"}
        />
        <ToggleContainer>
          <Text style={toggleTextStyle}>
            {isLogin ? "Don't have account?  " : "Already have account?  "}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin((prev) => !prev)}>
            <Text
              style={{
                ...(toggleTextStyle as object),
                textDecorationLine: "underline",
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </Text>
          </TouchableOpacity>
        </ToggleContainer>
      </KeyboardAwareScrollView>
    </Layout>
  );
}
