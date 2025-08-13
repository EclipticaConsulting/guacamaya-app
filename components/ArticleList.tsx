import { FlatList, RefreshControl, View } from "react-native";
import ArticleCard from "./ArticleCard";

export default function ArticleList({ data, refreshing, onRefresh }: any) {
  return (
    <FlatList
      data={data}
      keyExtractor={(x) => x.id}
      renderItem={({ item }) => <ArticleCard a={item} />}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f1f1f1" }} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}
