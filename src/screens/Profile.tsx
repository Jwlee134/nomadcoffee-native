import { useLayoutEffect } from "react";
import styled from "styled-components/native";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Login from "../components/Login";
import useMe from "../hooks/useMe";
import { logUserOut } from "../libs/auth";
import { ProfileScreenProps } from "../types/navigator";

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const TopContainer = styled.View`
  align-items: center;
`;

const Avatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export default function Profile({ navigation }: ProfileScreenProps) {
  const me = useMe();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: me?.username });
  }, [navigation, me]);

  return (
    <Layout safeAreaView>
      {!me ? (
        <Login />
      ) : (
        <Container>
          <TopContainer>
            <Avatar source={{ uri: me.avatarUrl! }} />
          </TopContainer>
          <Button onPress={logUserOut} style={{ width: 80 }} title="Log out" />
        </Container>
      )}
    </Layout>
  );
}
