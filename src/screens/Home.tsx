import { FlatList } from "react-native";
import Layout from "../components/Layout";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import RefreshControl from "../components/RefreshControl";
import { useSeeCoffeeShopsQuery } from "../graphql/generated";

export default function Home() {
  const {
    data: { seeCoffeeShops } = {},
    loading,
    fetchMore,
    refetch,
  } = useSeeCoffeeShopsQuery();

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
        renderItem={({ item }) => <ListItem item={item} />}
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
