import { FlatList, Image, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import RefreshControl from "../components/RefreshControl";
import Text from "../components/Text";
import { useSeeCoffeeShopsQuery } from "../graphql/generated";

const Contents = styled.View`
  padding: 20px 10px;
`;

const Categories = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Category = styled.View<{ last: boolean }>`
  background-color: #6f4e37;
  padding: 5px 10px;
  border-radius: 100px;
  margin-right: ${({ last }) => (last ? 0 : 10)}px;
`;

export default function Home() {
  const {
    data: { seeCoffeeShops } = {},
    loading,
    fetchMore,
    refetch,
  } = useSeeCoffeeShopsQuery();
  const { width } = useWindowDimensions();

  const onEndReached = () => {
    fetchMore({
      variables: {
        lastId: seeCoffeeShops?.[seeCoffeeShops.length - 1]?.id,
      },
    });
  };

  if (loading || !seeCoffeeShops) return <Loader />;
  return (
    <Layout>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={seeCoffeeShops || []}
        renderItem={({ item }) => (
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              data={item?.photos || []}
              renderItem={({ item }) => (
                <Image
                  style={{ width, height: width }}
                  source={{ uri: item?.url }}
                />
              )}
              keyExtractor={(item) => item?.id + ""}
            />
            <Contents>
              <Text style={{ fontWeight: "600", fontSize: 20 }}>
                {item?.name}
              </Text>
              <Categories>
                {item?.categories?.map((category, i) => (
                  <Category
                    key={category?.id}
                    last={i === item.categories?.length! - 1}
                  >
                    <Text>{category?.name}</Text>
                  </Category>
                ))}
              </Categories>
            </Contents>
          </View>
        )}
        keyExtractor={(item) => item?.id + ""}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={loading} />
        }
        onEndReached={onEndReached}
      />
    </Layout>
  );
}
