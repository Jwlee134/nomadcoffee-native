import { useReactiveVar } from "@apollo/client";
import styled from "styled-components/native";
import { tokenVar } from "../apollo/vars";
import Button from "../components/Button";
import Layout from "../components/Layout";
import Login from "../components/Login";
import Text from "../components/Text";
import { useMeQuery } from "../graphql/generated";
import useMe from "../hooks/useMe";
import { logUserOut } from "../libs/auth";

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

export default function Profile() {
  const me = useMe();

  return (
    <Layout>
      {!me ? (
        <Login />
      ) : (
        <Container>
          <TopContainer>
            <Avatar source={{ uri: me.avatarUrl! }} />
            <Text style={{ fontWeight: "600", fontSize: 26 }}>
              {me.username}
            </Text>
          </TopContainer>
          <Button onPress={logUserOut} style={{ width: 80 }} title="Log out" />
        </Container>
      )}
    </Layout>
  );
}
