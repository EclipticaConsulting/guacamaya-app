import { useLocalSearchParams, Stack } from "expo-router";
import { ScrollView, Image, Text, View } from "react-native";
import { ARTICLES } from "../../data/articles";

export default function ArticleDetail() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) return <Text>Artículo no encontrado</Text>;

  return (
    <>
      <Stack.Screen options={{ title: article.title, headerBackTitle: "Atrás" }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {article.coverUrl && (
          <Image source={{ uri: article.coverUrl }} style={{ width: "100%", height: 220 }} />
        )}
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "800" }}>{article.title}</Text>
          <Text style={{ color: "#777", marginTop: 6 }}>
            {article.tag} · {article.readMins} min · {new Date(article.publishedAt).toLocaleDateString()}
          </Text>
          <Text style={{ marginTop: 16, lineHeight: 22 }}>
            {article.summary} {"\n\n"}
            (Aquí irá el cuerpo; por ahora usamos mock.)
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
