import { useLayoutEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import Layout from "../components/Layout";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import RefreshControl from "../components/RefreshControl";
import Text from "../components/Text";
import { useSearchCoffeeShopsLazyQuery } from "../graphql/generated";
import { SearchScreenProps } from "../types/navigator";

const Input = styled.TextInput`
  color: white;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 0 10px;
`;

interface Form {
  keyword: string;
}

export default function Search({ navigation }: SearchScreenProps) {
  const [search, { data, loading, fetchMore, refetch }] =
    useSearchCoffeeShopsLazyQuery();
  const { width } = useWindowDimensions();
  const { control, handleSubmit } = useForm<Form>({
    defaultValues: { keyword: "" },
  });

  const onValid = ({ keyword }: Form) => {
    if (loading) return;
    search({ variables: { keyword } });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Controller
          control={control}
          name="keyword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Write a keyword..."
              placeholderTextColor="gray"
              style={{ width: width - 40 }}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              returnKeyType="search"
              onSubmitEditing={handleSubmit(onValid)}
            />
          )}
        />
      ),
    });
  }, [navigation]);

  const onEndReached = () => {
    fetchMore({
      variables: {
        lastId:
          data?.searchCoffeeShops?.[data?.searchCoffeeShops.length - 1]?.id,
      },
    });
  };

  return (
    <Layout>
      <DismissKeyboard>
        <>
          {loading ? <Loader /> : null}
          {data ? (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={data?.searchCoffeeShops || []}
              renderItem={({ item }) => <ListItem item={item} />}
              keyExtractor={(item) => item?.id + ""}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl onRefresh={refetch} refreshing={loading} />
              }
              onEndReached={onEndReached}
              ListEmptyComponent={
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>There's nothing to display.</Text>
                </View>
              }
            />
          ) : null}
        </>
      </DismissKeyboard>
    </Layout>
  );
}
