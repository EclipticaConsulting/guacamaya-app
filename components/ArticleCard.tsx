import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function ArticleCard({ a }: { a: any }) {
  return (
    <Link href={`/article/${a.slug}`} asChild>
      <Pressable style={{ flexDirection: "row", gap: 12, padding: 12 }}>
        {a.coverUrl ? (
          <Image source={{ uri: a.coverUrl }} style={{ width: 96, height: 96, borderRadius: 12 }} />
        ) : (
          <View style={{ width: 96, height: 96, borderRadius: 12, backgroundColor: "#eee" }} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }} numberOfLines={2}>{a.title}</Text>
          <Text style={{ color: "#666", marginTop: 4 }} numberOfLines={2}>{a.summary}</Text>
          <Text style={{ color: "#999", marginTop: 6, fontSize: 12 }}>
            {a.tag} · {a.readMins} min
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
