import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import ArticleList from "../components/ArticleList";
import { ARTICLES } from "../data/articles";

export default function HomeScreen() {
  const [q, setQ] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return ARTICLES;
    return ARTICLES.filter(a =>
      a.title.toLowerCase().includes(k) ||
      a.summary.toLowerCase().includes(k) ||
      a.tag.toLowerCase().includes(k)
    );
  }, [q]);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 500)); // simula fetch
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 12, paddingTop: 8, paddingBottom: 4 }}>
        <Text style={{ fontSize: 24, fontWeight: "800" }}>Guacamaya</Text>
        <Text style={{ color: "#666" }}>Noticias y contexto local</Text>
      </View>
      <SearchBar value={q} onChange={setQ} />
      <ArticleList data={filtered} refreshing={refreshing} onRefresh={onRefresh} />
    </SafeAreaView>
  );
}
